<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { addQuestNoteMutation } from '$lib/persistance/quests';
  import { MessageCircle } from 'lucide-svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import { user } from '$lib/utils/auth';
  import { Carta, MarkdownEditor } from 'carta-md';

  const carta = new Carta();
  import './github.css';

  export let questId: number;

  let value = '';

  const m = addQuestNoteMutation();

  $: userId = $user?.id;

  let anonymous = false;

  $: handleAdd = (e) => {
    e.preventDefault();
    if (!!value && value !== '') {
      $m.mutate({ quest_id: questId, content: value, author_id: anonymous ? null : userId });
    }
    value = '';
  };

  $: console.log('value', value);
</script>

<form class="flex-col items-center gap-2 hidden md:flex" on:submit={handleAdd}>
  <MarkdownEditor {carta} bind:value mode="tabs" theme="github" />
  <div class="flex flex-row w-full items-center justify-between gap-2 rounded">
    <SwitchField bind:value={anonymous} label="Comment anonymously" />
    <Button disabled={value === '' && !$m.isLoading} type="submit" class=""
      >Add <MessageCircle class="fill-white" /></Button
    >
  </div>
</form>

<style>
  :global(.carta-font-code) {
    font-family: '...', monospace;
    font-size: 1.1rem;
    color: white;
  }
</style>
