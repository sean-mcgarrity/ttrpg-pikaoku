<script lang="ts">
  import AdminOnly from '$components/AdminOnly.svelte';
  import Footer from '$components/Footer.svelte';
  import NavLink from './NavLink.svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="w-full relative flex-col bg-dark-500 text-white">
  <nav class="bg-pink-800 p-2">
    <NavLink href="/home" text="Home" />
    <AdminOnly>
      <NavLink href="/admin" text="Admin" />
    </AdminOnly>
    <NavLink href="/campaigns" text="Campaigns" />
    <NavLink href="/characters" text="Characters" />
  </nav>
  <div
    class="bg-blue-700/20 relative min-h-screen h-full max-w-4xl mx-auto shadow flex flex-col"
  >
    <div class="flex-1 px-4 pt-8 flex flex-col gap-4">
      {@render children?.()}
    </div>
    <Footer />
  </div>
</div>
