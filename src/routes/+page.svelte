<script>
	import { enhance } from "$app/forms";
  import Dropzone from "svelte-file-dropzone";
  export let data, form;

  /**
	 * @type {string | any[]}
	 */
  let files = [];
  /**
	 * @type {any[]}
	 */
  let fileData = [];

  // @ts-ignore
  function processRawCSV(contents) {
    const output = [];
    const rows = contents.split("\n");
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].split(",");
      output.push(cells);
    }
    // drop any columns past the first 3
    for (let i = 0; i < output.length; i++) {
      output[i] = output[i].slice(0, 3);
    }
    return output;
  }

  /**
	 * @param {{ detail: { acceptedFiles: string | any[]; }; }} e
	 */
  function handleFilesSelect(e) {
    files = e.detail.acceptedFiles;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        fileData = processRawCSV(binaryStr);
      };
      console.log(reader.readAsText(files[i]));
    }
  }
</script>


<h1>Check In App</h1>

<!-- EXISTING CHECK-IN LISTS -->
<h3>Current Check-ins:</h3>
<!-- for each checkin list -->
{#each data.tables as table }
<ul>
  <li><a href="/{table}">{table}</a></li>
</ul>
{/each}

<hr>
<!-- NEW CHECK-IN LIST -->
<h3>New Check-in list</h3>
<Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv" />
{#each files as item}
<h2>{item.name.split(".", 1)}</h2>
{/each}
  <form method="post" use:enhance>
    <input type="text" name="eventName" value={files[0]?.name.split(".",1) ?? ''} /><br>
    <textarea value={fileData} name="attendees" cols="100" rows="10"/><br>
    <button type="submit">Upload</button>
  </form>
{#if form?.message && form?.message !== ''}
  <p style="color: red;">{JSON.stringify(form.message)}</p>
{/if}