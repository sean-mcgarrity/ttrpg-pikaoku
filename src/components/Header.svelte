<script lang="ts">
  export let user = null;

  console.log('header user', user);
</script>

<nav class="p-4 lg:px-6 bg-gray-700 border-b border-gray-900 shadow">
  <div class="max-w-6xl flex items-center justify-between text-white mx-auto">
    <div class="font-bold text-2xl uppercase">
      <a class="" href="/">Sean runs Games</a>
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
  </div>
</nav>
