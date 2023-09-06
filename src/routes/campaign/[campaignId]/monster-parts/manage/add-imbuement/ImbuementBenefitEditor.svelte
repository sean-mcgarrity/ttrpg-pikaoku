<script lang="ts">
  type StageMatrix = { level: number; preview: string; benefits: string }[];
  export let onCommit = (value: StageMatrix) => console.log(value);

  import Button from '$src/components/Button.svelte';
  import NumberField from '$src/components/forms/controls/NumberField.svelte';
  import TextField from '$src/components/forms/controls/TextField.svelte';

  export let stages: StageMatrix = [];

  const updateStage = (level: number, field: string, value: string | number) => {
    const stage = stages.find((s) => s.level === level);
    if (stage) {
      stage[field] = value;
    }
    stages = [...stages].sort((a, b) => a.level - b.level);
  };

  const newStage = (): StageMatrix[number] => {
    const previousStage = stages[stages.length - 1];
    const nextlevel = (previousStage?.level ?? 0) + 1;
    const previousBenefits = previousStage?.benefits ?? '';
    return {
      level: nextlevel,
      benefits: previousBenefits,
      preview: ''
    };
  };
</script>

<div class="flex flex-col gap-4">
  {#if stages.length === 0}
    <Button on:click={() => (stages = [...stages, newStage()])}>Add first level +</Button>
  {/if}
  {#each stages as stage}
    <div class="p-4 rounded bg-white/20 flex flex-row gap-4">
      <div class="w-1/4 text-2xl h-12">
        <NumberField
          label="Level"
          on:change={(e) => updateStage(stage.level, 'level', e.target['value'])}
          value={stage.level}
        />
      </div>
      <div class="flex flex-col gap-2 w-full">
        <TextField
          placeholder="Current Benefit"
          label="benefits"
          value={stage.benefits}
          on:change={(e) => updateStage(stage.level, 'benefits', e.target['value'])}
        />
        <TextField
          placeholder="Next Benefit"
          label="preview"
          value={stage.preview}
          on:change={(e) => updateStage(stage.level, 'preview', e.target['value'])}
        />
      </div>
    </div>
  {/each}
</div>
{#if stages.length > 0}
  <Button on:click={() => (stages = [...stages, newStage()])}>Add level +</Button>
{/if}
