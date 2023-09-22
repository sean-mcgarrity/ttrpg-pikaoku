<script lang="ts">
  type HeadingTypes = 'Page Heading' | 'Section Heading' | 'Subsection Heading';

  export let type: HeadingTypes;
</script>

{#if !type}
  NOT ENOUGH INFO
{:else if type === 'Page Heading'}
  <h1 class="text-4xl font-semibold mb-4">
    <slot />
  </h1>
{:else if type === 'Section Heading'}
  <h2 class="text-2xl font-medium mb-2">
    <slot />
  </h2>
{:else if type === 'Subsection Heading'}
  <h3 class="text-2xl font-bold">
    <slot />
  </h3>
{/if}
