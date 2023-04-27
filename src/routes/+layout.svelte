<script>
  import '../app.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import { onMount } from 'svelte';
  onMount(async () => {});
</script>

<div
  class="bg-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col font-sans"
>
  <Header />
  <main class="flex-1 border-0 p-2 sm:p-8">
    <slot />
  </main>
  <Footer />
</div>
