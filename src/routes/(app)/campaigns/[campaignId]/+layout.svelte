<script lang="ts">
  import { page } from '$app/stores';
  import AdminOnly from '$components/AdminOnly.svelte';
  import { getCurrentCampaign } from '$lib/persistance/campaign';
  import { getUserProfile } from '$lib/persistance/users';
  import { User, PencilRuler, ArrowLeft } from 'lucide-svelte';

  const campaignQuery = getCurrentCampaign();
  const profileQuery = getUserProfile();

  $: campaign = $campaignQuery.data;
</script>

{#if campaign}
  <div class="antialiased flex flex-col font-sans text-white w-full bg-campaign" id="campaign-page">
    <div
      class="md:h-60 w-full bg-cover bg-center bg-no-repeat flex flex-col md:flex-row items-end justify-end md:justify-between md:gap-2"
      style={`background-image:url('${campaign?.banner_src}')`}
    >
      <div class="h-full flex flex-col justify-between mr-auto w-full">
        <a
          href={`/`}
          class="w-full mb-auto md:w-auto bg-campaign hover:brightness-125 px-4 py-2 md:rounded-br md:mr-auto font-light hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <h1 class=""><ArrowLeft /> View all campaigns</h1>
        </a>
        <a
          href={`/campaigns/${campaign.id}`}
          class="w-full md:w-auto bg-campaign hover:brightness-125 px-4 py-2 md:rounded-tr text-3xl mr-auto font-title"
        >
          <h1 class="">
            {campaign.name}
          </h1>
        </a>
      </div>
      <AdminOnly>
        <a
          href={`/campaigns/${campaign.id}/edit`}
          class="bg-orange-700 text-white p-2 md:rounded-t flex flex-row items-center gap-2 hover:bg-orange-600 transition-all duration-150 cursor-pointer hover:scale-105 w-full md:w-auto  whitespace-nowrap"
        >
          <PencilRuler /> Admin Edit
        </a>
      </AdminOnly>
      <a
        href={`/me`}
        class="bg-campaign text-white p-2 md:rounded-tl flex flex-row items-center gap-2 hover:brightness-125 transition-all duration-150 cursor-pointer hover:scale-105 w-full md:w-auto text-nowrap"
      >
        <User />
        {$profileQuery.data?.username}
      </a>
    </div>
    <main class="flex-1 border-0 p-4 md:p-4 mx-auto w-full">
      <slot />
    </main>
  </div>

  <style>
    #campaign-page {
      --campaign-color: 12 25 31;
    }
  </style>
{/if}
