<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/buttons/Button.svelte';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import { supabase } from '$lib/utils/auth';
  import { createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { Check } from 'lucide-svelte';

  let queryClient = useQueryClient();

  $: campaignId = $page.params.campaignId;

  $: createInviteMutation = createMutation<
    unknown,
    unknown,
    {
      uses: number;
      expiresAt: Date;
    }
  >(
    ['create-invite'],
    async ({ uses, expiresAt }) => {
      await $supabase.from('campaign_invite').insert({
        campaign_id: parseInt(campaignId),
        max_uses: uses,
        expires: expiresAt.toISOString()
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['campaign-invites']);
      }
    }
  );

  const getDefaultExpireDate = () => {
    let date = new Date();
    date.setMonth(date.getMonth() + 2);
    date.setDate(1);
    return date;
  };

  let uses = 1;
  let expiresAt = getDefaultExpireDate();
  $: expiresAtString = expiresAt.toISOString().split('T')[0];

  $: handleSubmit = () => {
    $createInviteMutation.mutateAsync({
      uses,
      expiresAt: new Date(expiresAt)
    });
  };

  $: handleDateChange = (e: Event) => {
    expiresAt = new Date((e.target as HTMLInputElement).value);
  };
</script>

<div class="bg-slate-800 rounded shadow p-4">
  <h2 class="text-2xl font-bold mb-4">New invite</h2>
  <form class="grid grid-cols-2 gap-4" on:submit={handleSubmit}>
    <div>Uses</div>
    <div>Expires</div>
    <NumberField bind:value={uses} />
    <input
      type="date"
      value={expiresAtString}
      on:change={handleDateChange}
      class="text-black rounded p-2"
    />
    <div class="flex flex-row col-span-2 justify-center">
      <Button type="submit" class=" text-center">Create <Check /></Button>
    </div>
  </form>
</div>
