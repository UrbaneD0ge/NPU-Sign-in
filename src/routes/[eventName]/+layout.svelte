<script>
import {page} from '$app/stores';
</script>

<header>
  <h1>Check-In: {$page.url.pathname.split("/")[1]}</h1>
<ul>
  <li><a href="/">Home</a></li>
</ul>
</header>


<slot/>

<style>
  h1 {
    text-align: center;
  }
</style>