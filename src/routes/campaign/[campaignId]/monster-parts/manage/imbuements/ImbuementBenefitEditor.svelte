<script lang="ts">
  import Button from '$components/Button.svelte';
  import LoadingInsert from '$components/layout/LoadingInsert.svelte';
  import type { Imbuement } from '$lib/systems/pf2e_monster_parts';
  import ImbuementLevelEditor from './ImbuementLevelEditor.svelte';

  export let stages: Imbuement['levels'] = [];

  export let onCommit = (value: Imbuement['levels'][number]) => console.log(value);

  const newStage = (): Imbuement['levels'][number] & Record<'rid', number> => {
    const previousStage = stages[stages.length - 1];
    const nextlevel = (previousStage?.level ?? 0) + 1;
    const previousBenefits = previousStage?.benefits ?? [''];
    return {
      rid: Math.random(),
      level: nextlevel,
      benefits: previousBenefits,
      preview: ''
    };
  };

  $: stages = stages.sort((a, b) => a.level - b.level).filter((stage) => stage.level > 0);

  $: console.log('stages', stages);
</script>

<div class="flex flex-col gap-4">
  {#if stages.length === 0}
    <Button on:click={() => (stages = [...stages, newStage()])}>Add first level +</Button>
  {/if}
  {#each stages as stage (stage.level)}
    <ImbuementLevelEditor
      bind:level={stage}
      onDelete={() => (stages = stages.filter((s) => s.level !== stage.level))}
    />
  {/each}
</div>
{#if stages.length > 0}
  <Button on:click={() => (stages = [...stages, newStage()])}>Add level +</Button>
{/if}
