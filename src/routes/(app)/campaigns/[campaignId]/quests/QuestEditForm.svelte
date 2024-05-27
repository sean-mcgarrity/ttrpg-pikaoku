<script lang="ts">
  import Button from '$components/buttons/Button.svelte';
  import TextAreaField from '$components/forms/controls/TextAreaField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import type { TablesInsert, TablesUpdate } from '$types/database';
  import { SaveIcon } from 'lucide-svelte';

  type EdittedQuest = TablesInsert<'quest'> | TablesUpdate<'quest'>;

  export let quest: TablesInsert<'quest'> | TablesUpdate<'quest'>;
  export let onSubmit: (result: EdittedQuest) => void;

  let _quest = structuredClone(quest);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const { name, summary, description, group } = _quest;
    onSubmit({ name, summary, description, group });
  };

  $: canSave = _quest.name?.length > 0 && _quest.summary?.length > 0;
</script>

<form on:submit={handleSubmit}>
  <div class="flex flex-col gap-3">
    <div class="w-full md:w-2/3">
      <TextField label="Name" bind:value={_quest.name} />
    </div>
    <TextField
      label="Summary"
      bind:value={_quest.summary}
      placeholder="This text will appear on the quest list page"
    />
    <TextAreaField
      label="Description"
      bind:value={_quest.description}
      placeholder="Enter a description of the quest details"
    />
    <div class="w-full md:w-2/3">
      <TextField
        label="Group"
        bind:value={_quest.group}
        placeholder="Which group this apears under"
      />
    </div>
    <Button type="submit" oldStyle={false} color="green" class="ml-auto" disabled={!canSave}>
      <SaveIcon />
      Save</Button
    >
  </div>
</form>
