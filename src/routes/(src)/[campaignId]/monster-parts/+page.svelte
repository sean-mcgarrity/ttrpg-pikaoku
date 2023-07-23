<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';

  let campaigns = [];

  onMount(async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')

    console.log(data, error);

    if (data) {
      campaigns = data;
    }
  })

</script>

Are great
<div class="text-white font-bold mt-8">
{#each campaigns as campaign}
  <div>{campaign.name}</div>
{/each}
</div>
