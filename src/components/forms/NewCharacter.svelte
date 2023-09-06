<script lang="ts">
  import { page } from '$app/stores';
  import SwitchField from '$src/components/forms/controls/SwitchField.svelte';
  import TextField from '$src/components/forms/controls/TextField.svelte';

  const campaignId = $page.params.campaignId;
  export let afterSubmit = () => {};
  export let onCancel = () => {};

  let title = '';
  let active = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // supabase insert to player_characters

    const { data: result, error } = await $page.data.supabase.from('player_characters').insert([
      {
        name: title,
        active,
        campaign: campaignId
      }
    ]);
    if (error) {
    } else {
      afterSubmit();
    }
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
    <button
      type="button"
      class="text-gray-400 px-3 font-bold hover:bg-white hover:bg-opacity-10 rounded"
      on:click={() => (add = false)}>X</button
    >
  </div>
</form>
