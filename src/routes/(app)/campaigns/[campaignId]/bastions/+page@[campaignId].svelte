<script lang="ts">
  import BigButton from '$components/buttons/BigButton.svelte';
  import Heading from '$components/layout/Heading.svelte';
  import { getCampaignId } from '$lib/utils/contextual-helpers';
  import { ArrowRightIcon } from 'lucide-svelte';
  import BackToCampaign from '../BackToCampaign.svelte';

  const campaignId = getCampaignId();

  const bastions = [
    {
      id: 1,
      name: 'Ramses',
      banner_src: 'https://i.imgur.com/Fa6YueK.jpeg'
    },
    {
      id: 1,
      name: 'Ramses II',
      banner_src: 'https://i.imgur.com/Fa6YueK.jpeg'
    }
  ] as const;
</script>

<BackToCampaign />
<Heading type="Page Heading">Bastions</Heading>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="md:col-span-2">
    <div class="flex flex-col gap-2">
      {#each bastions as bastion}
        <a
          href={`/campaigns/${campaignId}/bastions/${bastion.id ?? 1}`}
          class="bg-offwhite text-offblack rounded-lg shadow overflow-hidden cursor-pointer hover:brightness-105 border-0"
        >
          <img src={bastion.banner_src} alt="" class="object-contain" />
          <div class="px-4 py-2 flex flex-row justify-between items-center">
            <div>
              <h2 class="text-xl font-medium">{bastion.name}</h2>
              <div class="">The ultimate Death machine</div>
            </div>
            <ArrowRightIcon class="custom-icon" size={28} />
          </div>
        </a>
      {/each}
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <BigButton>Create</BigButton>
    <BigButton>Ramses</BigButton>
  </div>
</div>
