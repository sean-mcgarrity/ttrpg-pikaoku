<script lang="ts">
  import cx from 'classnames';
  export let label: string = null;
  export let value: number;
</script>

<label class={cx(!label && 'w-full')}>
  {#if label}
    <div class="text-white font-medium">{label}</div>
  {/if}
  <input
    type="number"
    class={cx('rounded px-4 py-1 w-full bg-white bg-opacity-80', !label && 'h-full')}
    bind:value
  />
</label>
