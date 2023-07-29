<script lang="ts">
  import { page } from '$app/stores';
  const campaignId = $page.params.campaignId;

  let add = false;

  let characters = [];
  async function loadCharacters() {
    const { data: result, error } = await $page.data.supabase
      .from('campaign_characters')
      .select()
      .eq('campaign', campaignId);
    if (!error && result) {
      characters = result;
    }
  }

  // async function updateCharacter() {
  //   const { data: result, error } = await $page.data.supabase
  //     .from('campaigns')
  //     .update({
  //       name: title,
  //       active: active
  //     })
  //     .eq('id', campaignId);
  //   console.log('result', result);
  //   if (!error && result) {
  //     campaign = result;
  //     title = campaign.name;
  //     description = campaign.description;
  //     bannerSrc = campaign.banner_src;
  //     passcode = campaign.passcode;
  //     archived = campaign.archived;
  //   }
  // }

  $: if ($page.data.session) {
    loadCharacters();
  }
</script>

<div>
  <div class="bg-white bg-opacity-10 rounded px-16 py-8 pb-16 flex flex-col gap-4">
    <button
      type="submit"
      class="rounded px-4 py-1 mt-4 bg-green-600 mx-auto font-medium text-black"
    >
      Save
    </button>
  </div>
</div>
