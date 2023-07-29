<script lang="ts">
  import { page } from '$app/stores';
  import { isAdmin } from '$src/lib/utils/auth';

  let admin = false;
  $: admin = isAdmin($page.data.session);
</script>

{#if admin}
  <slot />
{/if}
