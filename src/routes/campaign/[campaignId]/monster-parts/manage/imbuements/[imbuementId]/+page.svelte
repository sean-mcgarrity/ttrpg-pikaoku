<script lang="ts">
  import EditImbuementForm from '../ImbuementEditor.svelte';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import BackButton from '$components/layout/BackButton.svelte';
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { page } from '$app/stores';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { extractData } from '$lib/utils/requests';
  import SomethingWentWrong from '$components/layout/SomethingWentWrong.svelte';
  import { goto } from '$app/navigation';
  import AddImbuement from '../../../item/[itemId]/AddImbuement.svelte';

  const { imbuementId } = $page.params;
  const supabase: SupabaseClient = $page.data.supabase;
  const imbuementQuery = createQuery({
    queryKey: ['imbuement', imbuementId],
    queryFn: async () =>
      extractData<Imbuement>(
        await supabase.from('mp_imbuements').select('*').eq('id', imbuementId).single()
      ),
    onError: (error) => console.log('error', error),
    refetchOnWindowFocus: false
  });

  $: console.log('imbuement', $imbuementQuery.data);

  const updateImbuement = createMutation({
    mutationFn: async (imbuement: Partial<Imbuement>) => {
      console.log('update imbuement', imbuement);
      return extractData<Imbuement>(
        await supabase.from('mp_imbuements').update(imbuement).eq('id', imbuementId).single()
      );
    },
    onSuccess: () => goto(`/campaign/${$page.data.campaign.id}/monster-parts/manage`)
  });

  const onSave = (imbuement) => $updateImbuement.mutate(imbuement);
</script>

<div class="text-white text-left">
  <div class="flex items-center mb-6">
    <BackButton />
    <h1 class="inline text-3xl font-medium">Edit imbuement</h1>
  </div>
  {#if $imbuementQuery.isLoading}
    <LoadingInsert />
  {:else if $imbuementQuery.isError}
    <SomethingWentWrong destination={`/campaign/${$page.data.campaign.id}/monster-parts/manage`} />
  {:else}
    <EditImbuementForm imbuement={$imbuementQuery.data} {onSave} />
    {#if $updateImbuement.isLoading}
      <LoadingInsert />
    {/if}
  {/if}
</div>
