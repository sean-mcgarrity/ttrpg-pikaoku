<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import { addQuestNoteMutation } from '$lib/persistance/quests';
  import { MessageCircle } from 'lucide-svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import { user } from '$lib/utils/auth';

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
</script>

<form class="flex flex-col items-center" on:submit={handleAdd}>
  <TextAreaField
    class="sm:col-span-3 "
    bind:value
    placeholder="Now with markdown and multiline..."
    rows={4}
  />
  <div class="flex flex-row w-full items-center justify-between gap-2 rounded">
    <SwitchField bind:value={anonymous} label="Comment anonymously" />
    <Button disabled={value === '' && !$m.isLoading} type="submit" class=""
      >Add <MessageCircle class="fill-white" /></Button
    >
  </div>
</form>
