<script lang="ts">
  export let user = null;

  console.log('header user', user);
</script>

<nav
  class="flex items-center p-4 lg:px-6 bg-gray-700 border-b border-gray-900 shadow text-white justify-between"
>
  <div class="font-bold text-2xl uppercase">
    <a class="" href="/">Sean's Game</a>
  </div>
  {#if user}
    <div class="flex flex-row items-center">
      <div class="mr-4">{user.email}</div>
      <a href="/logout">Logout</a>
    </div>
  {:else}
    <div>
      <a href="/login">Login</a>
    </div>
  {/if}
</nav>
