<script lang="ts">
  import cx from 'classnames';

  import Button from '$components/buttons/Button.svelte';

  interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange?: any;
  }

  let { currentPage, totalPages, onPageChange = (newPage: number) => {} }: Props = $props();

  function handlePageChange(newPage: number) {
    const newVal = Math.min(totalPages, Math.max(1, newPage));
    onPageChange(newVal);
  }

  function toStart() {
    handlePageChange(1);
  }

  function toPrev() {
    handlePageChange(currentPage - 1);
  }

  function toNext() {
    handlePageChange(currentPage + 1);
  }

  function toEnd() {
    handlePageChange(totalPages);
  }
</script>

<div class="flex flex-row mx-auto">
  <Button on:click={toStart}>&lt;&lt;</Button>
  <Button on:click={toPrev}>&lt;</Button>
  {#each { length: totalPages } as _, p}
    <Button
      on:click={() => handlePageChange(p + 1)}
      class={cx(p + 1 === currentPage && 'underline')}>{p + 1}</Button
    >
  {/each}
  <Button on:click={toNext}>&gt;</Button>
  <Button on:click={toEnd}>&gt;&gt;</Button>
</div>
