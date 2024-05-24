<script lang="ts">
  import { fade } from 'svelte/transition';
  import cx from 'classnames';

  export let fullPage = false;
  export let loading = false;
</script>

{#if loading}
  <div
    class={cx(
      'animate-pulse inset-0 bg-black/80 m-2 rounded z-50',
      fullPage ? 'fixed' : 'absolute '
    )}
    transition:fade
  />
  <div
    class={cx('inset-0 flex flex-row pointer-events-none z-50', fullPage ? 'fixed' : 'absolute ')}
    transition:fade
  >
    <div class="lds-facebook m-auto">
      <div />
      <div />
      <div />
    </div>
  </div>
{/if}

<style>
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #fff;
    border: 2px solid #20202020;
    border-radius: 0.05rem;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
</style>
