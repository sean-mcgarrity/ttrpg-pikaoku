<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { addQuestNoteMutation } from '$lib/persistance/quests';
  import { MessageCircle } from 'lucide-svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import { page } from '$app/stores';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';

  export let questId: number;

  let value = '';

  const m = addQuestNoteMutation();

  $: userId = $page.data.session.user.id;

  let anonymous = false;

  $: handleAdd = (e) => {
    e.preventDefault();
    if (!!value && value !== '') {
      $m.mutate({ quest_id: questId, content: value, author_id: anonymous ? null : userId });
    }
    value = '';
  };
</script>

<form class="flex flex-row gap-2 items-center" on:submit={handleAdd}>
  <TextAreaField
    class="sm:col-span-3 "
    bind:value
    placeholder="Now with markdown and multiline..."
    rows={4}
  />
  <div class="flex flex-col gap-2 bg-black/20 rounded px-4 pt-2 h-full">
    <SwitchField bind:value={anonymous} label="Anon" />
    <Button disabled={value === '' && !$m.isLoading} type="submit" class="mt-auto mb-2 mx-auto"
      >Add <MessageCircle class="fill-white" /></Button
    >
  </div>
</form>
