<script>
  import LandingLink from './LandingLink.svelte';
  import monsterPartsBanner from '$assets/images/monster-parts-banner.webp';
</script>

<svelte:head>
  <title>Sean Runs Games</title>
</svelte:head>

<main>
  <div class="max-w-lg flex flex-col gap-4 mx-auto">
    <LandingLink
      title="Monster Parts"
      description="A list of all the campaigns I've run."
      href="/monster-parts"
      bgImgSrc="monster-parts-banner"
    /> 
    <LandingLink
      title="Otari Handouts"
      description=""
      href="/handouts"
      bgImgSrc="monster-parts-banner"
    />
  </div>
</main>
