<script lang="ts">
  import cx from 'classnames';

  const colorClasses = {
    primary: 'bg-green-700 hover:bg-green-600',
    secondary: 'bg-blue-700 hover:bg-blue-600',
    danger: 'bg-red-700 hover:bg-red-600'
  };

  export let color: keyof typeof colorClasses = 'primary';
  export let onClick: () => void = () => {};
</script>

<button
  on:click={onClick}
  class={cx(
    'bg-green-700 px-4 py-2 rounded shadow hover:bg-green-600 font-medium',
    colorClasses[color]
  )}
>
  <slot />
</button>
