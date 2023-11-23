<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import TextField from '$components/forms/controls/TextField.svelte';
  import { LogIn } from 'lucide-svelte';
  import cx from 'classnames';
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { isAdmin } from '$lib/utils/auth';
  import type { Database } from 'types/database';
  import type { SupabaseClient } from '@supabase/supabase-js';

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
  let error = null;

  $: href = `/campaign/${campaign.id}`;
  $: title = campaign.name;
  $: bgImgSrc = campaign.banner_src;

  $: isDisabled = disabled || !campaign || campaign.archived;

  $: signIn = async () => {
    const respone = await ($page.data.supabase as SupabaseClient<Database>).auth.signInWithPassword(
      {
        email: campaign.email,
        password
      }
    );

    if (respone.error) {
      alert(respone.error.message);
    } else {
      goto(href);
    }
    password = '';
  };

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    if (isAdmin($page.data.session) || $page.data.session?.user?.email === campaign.email) {
      goto(href);
    } else {
      expanded = !expanded;
    }
  };
</script>

<div class={cx('inline w-full', isDisabled && 'grayscale pointer-events-none')}>
  <button
    on:click={handleClick}
    class={`w-full bg-cover transition-all duration-150 group relative h-48 py-12 gap-8 border-4 border-black hover:border-white/80 shadow bg-center`}
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
      {#if expanded}
        <div class={cx('overflow-hidden', 'max-h-60')} transition:slide|local>
          <form on:submit={signIn} class="mt-4 flex flex-row gap-4 items-center">
            <div>Passcode</div>
            <div class="bg-white/40 rounded w-full">
              <TextField type="password" bind:value={password} autofocus />
            </div>
            <Button type="submit">Login <LogIn class="h-4 w-4 inline" /></Button>
          </form>
        </div>
      {/if}
    </div>
  </button>
</div>
