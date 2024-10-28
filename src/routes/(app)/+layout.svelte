<script lang="ts">
  import Footer from '$components/Footer.svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="relative w-full flex-col bg-dark-500 text-white shadow-inner h-full">
  <div class="absolute opacity-5 inset-0"></div>
  <div class="relative min-h-screen max-w-4xl mx-auto shadow ">
    {@render children?.()}
    <Footer />
  </div>
</div>
