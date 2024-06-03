<script>
  export let data;
</script>

<h1>Check-in App</h1>
<ul>
  {#each data.attendees as attendee}
    <li>{attendee.name}</li>
  {/each}
</ul>