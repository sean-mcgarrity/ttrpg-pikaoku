<script>
  import { page } from '$app/stores';
  import AdminOnly from '$src/components/AdminOnly.svelte';
  import Breadcrumbs from '$src/components/Breadcrumbs.svelte';
  import LandingLink from '$src/components/LandingLink.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';

  $: campaignId = $page.params.campaignId;
</script>

<svelte:head>
  <title>Sean Runs Games</title>
</svelte:head>

<main>
  <div class="max-w-lg flex flex-col gap-4 mx-auto">
    <LandingLink
      title="Monster Parts"
      description="A list of all the campaigns I've run."
      href={`/campaign/${campaignId}/monster-parts`}
      bgImgSrc="monster-parts-banner"
    />
    <LandingLink
      title="Otari Handouts"
      description=""
      href="/handouts"
      bgImgSrc="monster-parts-banner"
    />
  </div>
  <AdminOnly>
    <div class="w-full mt-8 mx-auto max-w-sm text-center">
      <div class="w-3/5 mx-auto border-b border-solid border-white border-opacity-40 mb-4" />
      <LinkButton href={`/campaign/${campaignId}/edit`}>Edit campaign &#9881;</LinkButton>
    </div>
  </AdminOnly>
</main>
