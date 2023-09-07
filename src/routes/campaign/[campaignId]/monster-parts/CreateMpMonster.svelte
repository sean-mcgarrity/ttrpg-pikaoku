<script lang="ts">
  import Button from '$components/Button.svelte';
  import NumberField from '$components/forms/controls/NumberField.svelte';
  import SwitchField from '$components/forms/controls/SwitchField.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';

  export let onFinish = (monster: MP_Monster) => {
    console.log('onFinish', monster);
  };

  let name: string = '';
  let level: number = 0;
  let revealed: boolean = false;
  let flags: MP_Monster['flags'] = [];

  const handleSave = () => {
    const monster: MP_Monster = {
      name,
      level,
      revealed,
      flags
    };

    onFinish(monster);
  };

  const toggleFlag = (flag: MP_Monster['flags'][0]) => {
    if (flags.includes(flag)) {
      flags = flags.filter((f) => f !== flag);
    } else {
      flags = [...flags, flag];
    }
  };
</script>

<div class="text-white my-8 p-8 rounded bg-pink-900 flex flex-col gap-4">
  <TextField bind:value={name} label="Name" />
  <NumberField bind:value={level} label="Level" />
  <SwitchField bind:value={revealed} label="Revealed" />
  <h3>What can this be used for?</h3>
  <div class="flex flex-col gap-4">
    <details>
      <summary class="cursor-pointer hover:bg-white/20 px-4 py-2 rounded">Armors</summary>
      <div class="flex flex-col gap-2">
        <SwitchField
          label="Leather Armor"
          on:change={() => toggleFlag('armor_leather')}
          value={flags.includes('armor_leather')}
        />
      </div>
    </details>
    <details>
      <summary class="cursor-pointer hover:bg-white/20 px-4 py-2 rounded">Weapons</summary>
      <div>choose choose choose</div>
    </details>
    <details>
      <summary class="cursor-pointer hover:bg-white/20 px-4 py-2 rounded">Skills</summary>
      <div>choose choose choose</div>
    </details>
  </div>
  <Button on:click={handleSave}>Create</Button>
</div>
