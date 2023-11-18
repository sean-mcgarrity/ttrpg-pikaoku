<script lang="ts">
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { addQuestNoteMutation } from '$lib/persistance/quests';
  import { MessageCircle } from 'lucide-svelte';

  export let questId: number;

  let value = '';

  const m = addQuestNoteMutation();

  $: handleAdd = () => {
    if (!!value && value !== '') {
      $m.mutate({ quest_id: questId, content: value });
    }
    value = '';
  };
</script>

<form class="flex flex-row gap-2 px-4 items-center" on:submit={handleAdd}>
  <TextField class="sm:col-span-3" bind:value placeholder="New comment..." />
  <Button disabled={value !== '' && !$m.isIdle} type="submit"
    >Add <MessageCircle class="fill-white" /></Button
  >
</form>
