<script lang="ts">
  import Footer from '$components/Footer.svelte';
</script>

<div class="relative w-full flex-col bg-slate-950 text-white shadow-inner h-full">
  <div class="absolute opacity-5 inset-0 z-0 bg-[url('https://i.imgur.com/cgGOKak.webp')]" />
  <div
    class="relative min-h-screen max-w-6xl mx-auto border-x-4 border-black/50 shadow-lg bg-slate-950"
  >
    <slot />
    <Footer />
  </div>
</div>
