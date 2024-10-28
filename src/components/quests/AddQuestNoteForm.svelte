<script lang="ts">
  import { run } from 'svelte/legacy';

  import Button from '$components/buttons/Button.svelte';
  import { addQuestNoteMutation } from '$lib/persistance/quests';
  import { MessageCircle } from 'lucide-svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import { user } from '$lib/utils/auth';
  import { Carta, MarkdownEditor } from 'carta-md';

  const carta = new Carta();
  import './github.css';

  interface Props {
    questId: number;
  }

  let { questId }: Props = $props();

  let value = $state('');

  const m = addQuestNoteMutation();

  let userId = $derived($user?.id);

  let anonymous = $state(false);

  let handleAdd = $derived((e) => {
    e.preventDefault();
    if (!!value && value !== '') {
      $m.mutate({ quest_id: questId, content: value, author_id: anonymous ? null : userId });
    }
    value = '';
  });

  run(() => {
    console.log('value', value);
  });
</script>

<form class="flex-col items-center gap-2 hidden md:flex" onsubmit={handleAdd}>
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
