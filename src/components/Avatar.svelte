<script lang="ts">
  import type { Tables } from '$types/database';
  import cs from 'classnames';

  export let profile: Partial<Pick<Tables<'profile'>, 'avatar_src' | 'username'>>;
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let overlapped = false;
</script>

<div
  class={cs(
    'bg-slate-800 border-2 border-slate-700/80 rounded-full flex flex-row justify-center items-center overflow-hidden',
    {
      'w-8 h-8': size === 'small',
      'w-10 h-10': size === 'medium',
      'w-14 h-14': size === 'large',
      '-mr-3': overlapped
    }
  )}
>
  {#if !profile}
    <span class="text-2xl font-medium">?</span>
  {:else if profile?.avatar_src}
    <img src={profile?.avatar_src} alt={profile.username} />
  {:else if profile?.username}
    {profile?.username[0]?.toUpperCase()}
  {:else}
    <span class="text-2xl font-medium">?</span>
  {/if}
</div>
