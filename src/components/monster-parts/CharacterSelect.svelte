<script lang="ts">
  import { run } from 'svelte/legacy';

  import SelectField from '$components/forms/controls/SelectField.svelte';
  import { getCharactersQuery } from '$lib/persistance/campaign';

  const qPlayerCharacters = getCharactersQuery();
  let playerCharacterOptions;
  run(() => {
    playerCharacterOptions = ($qPlayerCharacters.data ?? []).map((item) => ({
      text: item.name,
      value: item.id.toString()
    }));
  });

  interface Props {
    ownerId?: string;
  }

  let { ownerId = $bindable('') }: Props = $props();
</script>

<SelectField label="Character" bind:value={ownerId} bind:options={playerCharacterOptions} />
