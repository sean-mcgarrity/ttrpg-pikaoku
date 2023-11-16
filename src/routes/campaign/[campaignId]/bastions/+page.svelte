<script lang="ts">
  import BigLink from '$components/BigLink.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';

  interface Bastion {
    name: string;
    banner_src: string;
  }

  const campaignId = getCampaignId();

  const bastions: Bastion[] = [
    {
      name: 'Ramses',
      banner_src: 'https://i.imgur.com/eCReIrq.jpeg'
    },
    {
      name: 'Ramses II',
      banner_src: 'https://i.imgur.com/eCReIrq.jpeg'
    }
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="md:col-span-2">
    Bastions are cool
    <div class="flex flex-col gap-2">
      {#each bastions as bastion}
        <BigLink
          size="md"
          title={bastion.name}
          href={`/campaign/${campaignId}/bastions/${bastion.name}`}
          bgImgSrc={bastion.banner_src}
        />
      {/each}
    </div>
  </div>
  <div>Other COl</div>
</div>
