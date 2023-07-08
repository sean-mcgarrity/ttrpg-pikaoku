<script>
  import '../../app.css';
  import Header from './Header.svelte';
</script>

<div
  class="bg-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col font-sans"
>
  <div
    class="flex flex-row justify-between bg-pink-500 border-b-2 border-black border-opacity-20 shadow"
  >
    <div class="text-heading text-4xl px-4 py-4">Sean's Bits</div>
    <div class="text-heading text-lg cursor-pointer px-4 py-4">
      <a rel="prefetch" href="monster-parts/login">Login</a>
    </div>
  </div>
  <main class="flex-1 border-0 p-2 sm:p-8">
    <slot />
  </main>
  <div class="flex w-full flex-col items-center justify-center py-8 px-4">
    <div class="flex items-center text-white">(C) Sean McGarrity 2023</div>
  </div>
</div>
