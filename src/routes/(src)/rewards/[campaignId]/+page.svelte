<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from '$utils/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';

  let campaign;

  onMount(async () => {
    const q = doc(db, 'sites', 'otari', 'campaigns', $page.params.campaignId);
    const snapshot = await getDoc(q);
    const data = snapshot.data();
    console.log(data);
    campaign = data;
  });
</script>

{#if campaign}
  <div class="bg-slate-700 px-8 py-4 rounded shadow text-white">
    <h1 class="uppercase text-xl">Campaign: {campaign.name}</h1>
    
  </div>
{/if}
