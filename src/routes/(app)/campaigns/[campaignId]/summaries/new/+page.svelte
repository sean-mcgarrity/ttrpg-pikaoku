<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import BackTo from '$components/buttons/BackTo.svelte';
  import Button from '$components/buttons/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { PlusCircle } from 'lucide-svelte';

  let campaignId = $derived(parseInt($page.params.campaignId));

  let label = $state('');
  let link = $state('');

  let queryClient = useQueryClient();

  let { data } = $props();
  let { supabase } = $derived(data);

  let createHandoutM = createMutation({
    mutationKey: ['summaries', 'create'],
    mutationFn: async () => {
      await supabase
        .from('campaign_handout')
        .insert({ campaign_id: campaignId, label, link, type: 'summary' });
      return await queryClient.invalidateQueries(['campaign', campaignId, 'summaries']);
    },
    onSuccess: async () => {
      goto(`/campaigns/${campaignId}/summaries`);
    }
  });

  let handleSubmit = $derived(async (e) => {
    e.preventDefault();
    await $createHandoutM.mutateAsync();
  });
</script>

<div class="max-w-sm mx-auto">
  <LoadingInsert loading={$createHandoutM.isLoading} />
  <BackTo href={`/campaigns/${campaignId}/handouts`} text="campaign handouts" />
  <Heading type="Page Heading">New Summary</Heading>
  <form onsubmit={handleSubmit}>
    <div class="bg-white/20 p-8 rounded-xl flex flex-col gap-4">
      <TextField bind:value={label} label="Label" />
      <TextField bind:value={link} label="Link" />
      <Button type="submit" class="mx-auto mt-4">Create <PlusCircle /></Button>
    </div>
  </form>
</div>
