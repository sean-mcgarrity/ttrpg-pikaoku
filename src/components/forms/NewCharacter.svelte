<script lang="ts">
  import { page } from '$app/stores';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { mutateCreateCharacter } from '$lib/persistance/campaign';

  export let afterSubmit = () => {};

  let title = '';
  let active = true;

  const mCreateCharacter = mutateCreateCharacter();
  $: handleSubmit = async (e) => {
    e.preventDefault();
    $mCreateCharacter.mutate({ name: title, active });
    afterSubmit();
  };
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-2">
  <div class="flex flex-row gap-2">
    <TextField bind:value={title} />
    <SwitchField bind:value={active} />
    <button
      disabled={!title}
      type="submit"
      class="bg-green-700 text-white rounded px-4 py-2 hover:bg-green-600 cursor-pointer"
    >
      Save
    </button>
  </div>
</form>
