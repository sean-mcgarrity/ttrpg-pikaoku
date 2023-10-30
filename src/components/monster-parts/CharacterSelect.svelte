<script lang="ts">
  import SelectField from '$components/forms/controls/SelectField.svelte';
  import { getCharactersQuery } from '$lib/persistance/meta';

  const qPlayerCharacters = getCharactersQuery();
  $: playerCharacterOptions = ($qPlayerCharacters.data ?? []).map((item) => ({
    text: item.name,
    value: item.id.toString()
  }));

  export let ownerId = '';
</script>

<SelectField label="Character" bind:value={ownerId} bind:options={playerCharacterOptions} />
