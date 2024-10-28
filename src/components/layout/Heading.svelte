<script lang="ts">
  import cs from 'classnames';

  type HeadingTypes = 'Page Heading' | 'Section Heading' | 'Subsection Heading';

  interface Props {
    type: HeadingTypes;
    tight?: boolean;
    children?: import('svelte').Snippet;
  }

  let { type, tight = false, children }: Props = $props();
</script>

{#if !type}
  NOT ENOUGH INFO
{:else if type === 'Page Heading'}
  <h1 class={cs(!tight && 'mb-4', 'text-4xl font-semibold font-title uppercase')}>
    {@render children?.()}
  </h1>
{:else if type === 'Section Heading'}
  <h2 class={cs(!tight && 'mb-2', 'text-2xl font-medium font-title')}>
    {@render children?.()}
  </h2>
{:else if type === 'Subsection Heading'}
  <h3 class={cs(!tight && 'mb-2', 'text-2xl font-bold font-title')}>
    {@render children?.()}
  </h3>
{/if}
