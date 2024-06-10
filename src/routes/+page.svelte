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
    return output.toString().replace(/,/g, "\n").trim();
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

<svelte:head>
  <title>Check-In App</title>
</svelte:head>

<h1>Check In App</h1>

<!-- EXISTING CHECK-IN LISTS -->
<table>
  <thead>
    <h3> Current Check-ins:</h3>
  </thead>
<!-- for each checkin list -->
{#each data.tables as table }
  <tr>
    <td><a href="/{table}">{table}</a></td>
    <td>
      <form action="?/dropTable" method="post" use:enhance>
        <input type="hidden" name="eventName" value={table} />
        <button type="submit">Delete</button>
  </tr>
{/each}
</table>

<hr>
<!-- NEW CHECK-IN LIST -->
<h3>New Check-in list</h3>
<div id="dropZone">
  <Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv" />
<br><br>
{#each files as item}
<h2>{item.name.split(".", 1)}</h2>
{/each}
  <form action="?/newTable" method="post" use:enhance>
    <input type="text" name="eventName" value={files[0]?.name.split(".",1) ?? ''} /><br>
    <textarea value={fileData} name="attendees" cols="100" rows="10"/><br>
    <button type="submit">Upload</button>
  </form>
{#if form?.message && form?.message !== ''}
  <p style="color: red;">{JSON.stringify(form.message)}</p>
{/if}
</div>
<style>
  table {
    border-collapse: collapse;
    width: 100%;
    /* border: #d5d5d5 1px solid; */
  }

  td {
    /* border: 1px solid black; */
    padding: 8px;
    text-align: left;
  }
  td:nth-child(even) {
   text-align: right;
  }

  tr:nth-child(even) {
    background-color: #d5d5d5;
  }
  table button {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  #dropZone {
    width: 60%;
    padding: 20px;
    text-align: center;
    margin: 20px auto;
  }
</style>