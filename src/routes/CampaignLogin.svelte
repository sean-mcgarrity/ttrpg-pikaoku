<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$src/components/Button.svelte';
  import TextField from '$src/components/forms/controls/TextField.svelte';
  import { LogIn } from 'lucide-svelte';
  import cx from 'classnames';
  import { goto } from '$app/navigation';

  type Campaign = {
    id: string;
    name: string;
    description: string;
    email: string;
    banner_src: string;
    archived: boolean;
  };

  export let campaign: any;
  export let disabled = false;

  let expanded = false;
  let password = '';

  $: href = `/campaign/${campaign.id}`;
  $: title = campaign.name;
  $: bgImgSrc = campaign.banner_src;

  $: isDisabled = disabled || !campaign || campaign.archived;

  const signIn = async () => {
    const { data: response, error } = await $page.data.supabase.auth.signInWithPassword({
      email: campaign.email,
      password
    });
    if (!error) {
      goto(href);
    } else {
    }
  };
</script>

<div class={cx('inline w-full', isDisabled && 'grayscale pointer-events-none')}>
  <button
    on:click={() => (expanded = true)}
    class={`w-full bg-cover bg-center transition-all duration-150 group relative h-60 py-12 gap-8 border-4 border-black hover:border-white/80 shadow`}
    style={bgImgSrc && `background-image: url(${bgImgSrc});`}
    disabled={isDisabled}
  >
    <div
      class="transition-all duration-150 absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10"
    />
    <div
      class="transition-all duration-150 absolute bottom-0 w-full px-6 py-2 group-hover:py-4 bg-black bg-opacity-80 text-white text-left"
    >
      <h2 class="font-bold uppercase tracking-wider">{title}</h2>
      <div
        class={cx('transition-all duration-500 overflow-hidden', expanded ? 'max-h-60' : 'max-h-0')}
      >
        <form on:submit={signIn} class="mt-4 flex flex-row gap-4 items-center">
          <div>Passcode</div>
          <TextField type="password" bind:value={password} />
          <Button type="submit">Login <LogIn class="h-4 w-4 inline" /></Button>
        </form>
      </div>
    </div>
  </button>
</div>
