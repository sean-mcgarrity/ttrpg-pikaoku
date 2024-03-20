<script lang="ts">
  import type { Pf2eSuccessCard } from 'src/app';
  import cx from 'classnames';
  import { slide } from 'svelte/transition';
  import SvelteMarkdown from 'svelte-markdown';

  let expanded = true;

  export let child = false;
  export let successCard: Pf2eSuccessCard;

  const hasTopSection = successCard.requirements || successCard.trigger || successCard.frequency;
</script>

<div
  class={cx(
    "font-['Century Gothic'] flex flex-col overflow-hidden gap-3 font-gothic text-[rgb(223,213,193)]",
    child && 'pb-3',
    !child && 'bg-[#0f0f0f] rounded-lg border border-solid border-black mb-4'
  )}
>
  <button
    class={cx(
      child ? 'px-2 pt-1 rounded text-lg' : 'px-5 pt-2 pb-1 text-2xl',
      ' font-bold flex justify-between tracking-wide cursor-pointer card-header',
      successCard.card_type
    )}
    on:click={() => (expanded = !expanded)}
  >
    <span>{successCard.title}</span>
    {#if successCard.card_type !== 'action'}
      <span class="capitalize">{successCard.card_type} {successCard.card_level}</span>
    {/if}
  </button>
  {#if successCard.tags}
    <div class={cx('flex gap-1 flex-wrap text-sm', !child && 'px-4')}>
      {#each successCard.tags as tag}
        <div class="bg-[rgba(255,255,255,0.1)] rounded-md px-2 py-1">{tag}</div>
      {/each}
    </div>
  {/if}
  {#if expanded}
    <div
      transition:slide|local
      class={cx('quest-content flex flex-col gap-4 px-1', !child && 'px-4')}
    >
      {#if hasTopSection}
        <div class="">
          {#each ['trigger', 'frequency', 'requirements'] as key}
            {#if successCard[key]}
              <div>
                <span class="font-bold capitalize">{key}</span>
                {successCard[key]}
              </div>
            {/if}
          {/each}
          <div class="divider mt-2" />
        </div>
      {/if}

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
      {#if successCard.child_card?.[0]}
        <div class="divider" />
        <svelte:self successCard={successCard.child_card?.[0]} child />
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
