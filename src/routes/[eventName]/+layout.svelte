<script>
import {page} from '$app/stores';
</script>

<nav>
  <h1>Check-In: {decodeURIComponent($page.url.pathname.split("/")[1])}</h1>
<ul>
  <li><a href="/">Home</a></li>
</ul>
</nav>


<slot/>

<style>
  h1 {
    text-align: center;
  }
  nav ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    padding: 0;
  }
</style>