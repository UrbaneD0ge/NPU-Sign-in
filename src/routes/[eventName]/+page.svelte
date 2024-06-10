<script>
	import { enhance } from '$app/forms';

  export let data, form;
</script>

<!-- Make this into a reusable page that creates a checkin page for any uploaded CSV -->

<svelte:head>
  <title>Check-In: {data.table}</title>
</svelte:head>

<table>
  <tr>
    <th>Name</th>
    <th>Check-in</th>
    <!-- <th>ID</th> -->
  </tr>
  {#each data.attendees as attendee}
  <tr>
    <td>{attendee.names}</td>
      <!-- <td>{attendee.checked_in ? 'Yes':'No'}</td> -->
      <td>
        <form action="?/checkIn" method="post" use:enhance>
          <input type="hidden" name="table" value={data.table}>
          <input type="hidden" name="checkedIn" value={attendee.checked_in} checked={attendee.checked_in} />
          <input type="hidden" name="id" value={attendee.id} />
          <button type="submit" data-checkin={attendee.checked_in}>{attendee.checked_in ? 'Check OUT' : 'Check IN'}</button>
        </form></td>
  </tr>
  {/each}
</table>

<div id="addAttendee">
  {#if form?.message}
<p>{form.message}</p>
{/if}

<form action="?/add_attendee" method="post" use:enhance>
<input type="hidden" name="table" value={data.table}>
<input type="text" name="name" placeholder="Name" required>
<button type="submit">Add Attendee</button>
</form>
</div>

<style>
  input {
    width: 100%;
    padding: 0.5em;
    margin-block: 0.5em;
    border: 1px solid black;
    border-radius: 5px;
  }
  table {
    margin: 30px auto;
    border-collapse: collapse;
    min-width: 40%;
  }
  th, td {
    border: 1px solid black;
    padding: 0.5em;
  }
  th {
    background-color: #c7c7c7;
  }
  tr:nth-child(even) {
    background-color: #f0f0f0;
  }
  tr:nth-child(odd) {
    background-color: #f8f8f8;
  }
  button {
    background-color: #f0f0f0;
    border: 1px solid black;
    padding: 0.5em;
    width: 100%;
    border-radius: 5px;
  }
  button:hover {
    background-color: #e0e0e0;
  }
  #addAttendee {
    margin: 30px auto;
    width: 40%;

  }
  [data-checkin="true"] {
    background-color: red;
  }
  [data-checkin="false"] {
    background-color: green;
    color: white;
  }
</style>