<script lang="ts" context="module">
  export type ManageTableColumns<RowType = any> = {
    label: string;
    accessor: string | ((row: RowType) => string);
    span?: number;
    classes?: string;
  }[];

  export type ManageTableRowAction<RowType = any> = {
    text: string;
    onClick: (row: RowType) => void;
    icon?: any;
  };
</script>

<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import cx from 'classnames';
  import { slide } from 'svelte/transition';

  export let title;
  export let columns: ManageTableColumns = [];
  export let loading = false;
  export let rowActions: ManageTableRowAction[] = [];
  export let items = [];

  $: rowSpanStyle = `grid-template-columns: repeat(${columns.reduce(
    (acc, cur) => acc + (cur.span ?? 1),
    rowActions.length > 0 ? 1 : 0
  )}, minmax(0, 1fr));`;
</script>

<div class=" bg-white/10 rounded pb-4 relative">
  <h2
    class="pl-4 pr-2 py-2 w-full bg-blue-600/40 rounded mb-2 flex justify-between text-lg font-medium tracking-wide"
  >
    <span class="my-auto">{title}</span>
    <slot name="header-button" />
  </h2>
  <div class="px-4 flex flex-col">
    <slot name="head" />
    {#if loading}
      <LoadingInsert />
    {/if}
    {#if items.length}
      <div class="flex flex-col gap-2">
        <div class="grid gap-4 font-medium text-lg px-2 tracking-wider" style={rowSpanStyle}>
          {#each columns as column}
            <div style={`grid-column: span ${column.span ?? 1} / span ${column.span ?? 1};`}>
              <span class="border-b border-white border-solid pb-1">{column.label}</span>
            </div>
          {/each}
        </div>
        {#each items as item}
          <div
            class="grid gap-4 px-2 py-1 rounded items-center even:bg-black/10 hover:bg-black/20 cursor-pointer"
            style={rowSpanStyle}
            transition:slide
          >
            {#each columns as column}
              <div
                class={cx(column.classes, 'overflow-clip overflow-ellipsis')}
                style={`grid-column: span ${column.span ?? 1} / span ${column.span ?? 1};`}
              >
                {typeof column.accessor === 'string'
                  ? item[column.accessor]
                  : column.accessor(item)}
              </div>
            {/each}
            {#if rowActions.length > 0}
              <div class="ml-auto flex flex-col">
                {#each rowActions as rowAction (rowAction.text)}
                  <Button on:click={() => rowAction.onClick(item)}>
                    {rowAction.text}
                    {#if rowAction.icon}
                      <svelte:component this={rowAction.icon} class="h-4 w-4 inline" />
                    {/if}
                  </Button>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-white/60">No items</div>
    {/if}
    <slot name="tail" />
  </div>
</div>
