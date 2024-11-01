<script lang="ts">
  import { page } from '$app/stores';
  import cx from 'classnames';

  type Props = {
    href: string;
    text: string;
  };
  const { href, text }: Props = $props();

  const active = $derived($page.url.pathname.includes(href));
</script>

<a
  rel="stylesheet"
  {href}
  class={cx(
    'px-2 py-1 rounded hover:bg-white/10 transition-colors duration-150',
    active && 'pointer-events-none underline font-medium',
    !active && 'cursor-pointer'
  )}
>
  {text}
</a>
