<script>
  import Dropzone from "svelte-file-dropzone";
  export let data;

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
<h3>New Check-in list</h3>
<form method="post">
  <Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv" />
  {#each files as item}
    <h2>{item.name}</h2>
  {/each}
  <button type="submit">Upload</button>
</form>


<table border="1">
  {#each fileData as row}
    <tr>
      {#each row as item}
        <td>{item}</td>
      {/each}
    </tr>
  {/each}
</table>

<h3>Current Check-ins:</h3>
<!-- for each checkin list -->
{#each data.tables as table }
<ul>
  <li>{table}</li>
</ul>
{/each}