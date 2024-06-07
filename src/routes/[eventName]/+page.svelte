<script>
	import { enhance } from '$app/forms';

  export let data;
</script>

<!-- Make this into a reusable page that creates a checkin page for any uploaded CSV -->

<h1>Check-in: {data.table}</h1>
<!-- <p>{JSON.stringify(data)}</p> -->
<table>
  <tr>
    <th>Name</th>
    <th>Check-in</th>
    <th>ID</th>
  </tr>
  {#each data.attendees as attendee}
  <tr>
    <td>{attendee.name}</td>
      <td>{attendee.checked_in ? 'Yes':'No'}</td>
      <td>
        <form method="post" use:enhance>
          <input type="hidden" name="checkedIn" value={attendee.checked_in} />
          <input type="hidden" name="id" value={attendee.id} />
          <button type="submit">Check-in: {attendee.id}
        </button>
        </form></td>
  </tr>
  {/each}
</table>

