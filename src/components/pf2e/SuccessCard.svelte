<script lang="ts">
  import SuccessCard from './SuccessCard.svelte';
  import type { Pf2eSuccessCard } from 'src/app';
  import cx from 'classnames';
  import { slide } from 'svelte/transition';
  import SvelteMarkdown from 'svelte-markdown';
  import AdminOnly from '$components/AdminOnly.svelte';
  import Button from '$components/buttons/Button.svelte';
  import { Edit, Save } from 'lucide-svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { updateSuccessCardMutation } from '$lib/persistance/quests';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';

  const updateMutation = updateSuccessCardMutation();

  let expanded = $state(true);

  interface Props {
    editting?: boolean;
    child?: boolean;
    successCard: Pf2eSuccessCard;
  }

  let { editting = $bindable(false), child = false, successCard = $bindable() }: Props = $props();

  const hasTopSection = successCard.requirements || successCard.trigger || successCard.frequency;

  let updatedTags = $state(successCard.tags.join(','));

  let handleEdit = () => {
    editting = true;
    updatedTags = successCard.tags.join(',');
  };

  let handleCancel = () => {
    editting = false;
    updatedTags = successCard.tags.join(',');
  };

  let handleSave = $derived(() => {
    editting = false;
    successCard.tags = updatedTags.split(',');
    const { child_card, ...rest } = successCard;
    $updateMutation.mutate(rest);
  });
</script>

<div
  class={cx(
    "font-['Century Gothic'] flex flex-col overflow-hidden gap-3 font-gothic text-[rgb(223,213,193)]",
    child && 'pb-3',
    !child && 'bg-[#0f0f0f] rounded-lg border border-solid border-black mb-4 pb-3'
  )}
>
  {#if editting}
    <div
      class={cx(
        child ? 'px-2 pt-1 rounded text' : 'px-5 pt-2 pb-1 text-2xl',
        ' font-bold flex justify-between tracking-wide cursor-pointer card-header gap-2',
        successCard.card_type
      )}
    >
      <span class="w-3/5"><TextField bind:value={successCard.title} /></span>
      {#if successCard.card_type !== 'action'}
        <span class="capitalize flex flex-row w-2/5 gap-2"
          ><TextField bind:value={successCard.card_type} />
          <NumberField bind:value={successCard.card_level} /></span
        >
      {/if}
    </div>
  {:else}
    <button
      class={cx(
        child ? 'px-2 pt-1 rounded text-lg' : 'px-5 pt-2 pb-1 text-2xl',
        ' font-bold flex justify-between tracking-wide cursor-pointer card-header',
        successCard.card_type
      )}
      onclick={() => (expanded = !expanded)}
    >
      <span>{successCard.title}</span>
      {#if successCard.card_type !== 'action'}
        <span class="capitalize">{successCard.card_type} {successCard.card_level}</span>
      {/if}
    </button>
  {/if}

  {#if editting}
    <div class="p-4">
      <TextField bind:value={updatedTags} label="Tags" />
    </div>
  {:else if successCard.tags}
    <div class={cx('flex gap-1 flex-wrap text-sm', !child && 'px-4')}>
      {#each successCard.tags as tag}
        <div class="bg-[rgba(255,255,255,0.1)] rounded-md px-2 py-1">{tag}</div>
      {/each}
    </div>
  {/if}
  {#if editting || expanded}
    <div
      transition:slide
      class={cx('quest-content flex flex-col gap-4 px-1', !child && 'px-4')}
    >
      {#if editting}
        <TextField bind:value={successCard.trigger} placeholder="Trigger" label="Top Section" />
        <TextField bind:value={successCard.frequency} placeholder="Frequency" />
        <TextField bind:value={successCard.requirements} placeholder="Requirements" />
        <div class="divider mt-2"></div>
      {:else if hasTopSection}
        <div class="">
          {#each ['trigger', 'frequency', 'requirements'] as key}
            {#if successCard[key]}
              <div>
                <span class="font-bold capitalize">{key}</span>
                {successCard[key]}
              </div>
            {/if}
          {/each}
          <div class="divider mt-2"></div>
        </div>
      {/if}

      {#if editting}
        <TextAreaField bind:value={successCard.description} label="Description" rows={12} />
        <TextField
          bind:value={successCard.critical_success}
          placeholder="Critical success"
          label="Success Block"
        />
        <TextField bind:value={successCard.success} placeholder="success" />
        <TextField bind:value={successCard.failure} placeholder="failure" />
        <TextField bind:value={successCard.critical_failure} placeholder="Critical failure" />
      {:else}
        <div class="">
          <SvelteMarkdown
            source={successCard.description?.replaceAll('\n', '<br />')}
            options={{ break: true, gfm: true }}
          />
        </div>
        <div class="successes flex flex-col">
          {#each ['critical_success', 'success', 'failure', 'critical_failure'] as key}
            {#if successCard[key]}
              <div class="">
                <span class="font-bold capitalize mr-1">{key.replace('_', ' ')}</span>
                {successCard[key]}
              </div>
            {/if}
          {/each}
        </div>
      {/if}

      {#if successCard.child_card?.[0]}
        <div class="divider"></div>
        <SuccessCard successCard={successCard.child_card?.[0]} child />
      {/if}
      {#if !child}
        <AdminOnly>
          <div class="flex flex-row justify-end p-2 gap-2">
            {#if !editting}
              <Button on:click={handleEdit}
                ><Edit />
                <div>Edit</div></Button
              >
            {:else}
              <Button on:click={handleSave}
                ><Save />
                <div>Save</div></Button
              >
              <Button on:click={handleCancel}
                ><Edit />
                <div>Cancel</div></Button
              >
            {/if}
          </div>
        </AdminOnly>
      {/if}
    </div>
  {/if}
</div>

<style>
  .card-header.quest {
    background: rgb(82, 46, 44);
  }
  .card-header.action {
    background: rgb(98, 125, 98);
  }

  .divider {
    width: 100%;
    height: 1px;
    background: rgb(223, 213, 193);
  }
</style>
