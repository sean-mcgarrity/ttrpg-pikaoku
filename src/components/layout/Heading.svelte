<script lang="ts">
  import cs from 'classnames';

  type HeadingTypes = 'Page Heading' | 'Section Heading' | 'Subsection Heading';

  export let type: HeadingTypes;
  export let tight = false;
</script>

{#if !type}
  NOT ENOUGH INFO
{:else if type === 'Page Heading'}
  <h1 class={cs(!tight && 'mb-4', 'text-4xl font-semibold font-title uppercase')}>
    <slot />
  </h1>
{:else if type === 'Section Heading'}
  <h2 class={cs(!tight && 'mb-2', 'text-2xl font-medium font-title')}>
    <slot />
  </h2>
{:else if type === 'Subsection Heading'}
  <h3 class={cs(!tight && 'mb-2', 'text-2xl font-bold font-title')}>
    <slot />
  </h3>
{/if}
