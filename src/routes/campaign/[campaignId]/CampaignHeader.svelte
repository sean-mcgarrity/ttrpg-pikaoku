<script lang="ts">
  export let session;
  export let campaign;

  console.log('campaign', campaign);
</script>

<img
  class="w-full shadow max-h-60 border-b-2 border-black"
  alt="Abomination Vaults Logo"
  src={campaign.banner_src}
/>
