<script>
  import LinkButton from '$components/buttons/LinkButton.svelte';
  import Heading from '$components/layout/Heading.svelte';

  const characters = [];
</script>

<Heading type="Page Heading">Characters</Heading>
{#each characters as character}
  <div>{character}</div>
{:else}
  No chars you lazy git
{/each}
<LinkButton href="/characters/new">Add character</LinkButton>
