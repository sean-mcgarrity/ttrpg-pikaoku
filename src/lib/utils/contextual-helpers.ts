import { page } from '$app/stores';
import { get } from 'svelte/store';

export const getCampaignId = () => {
  return get(page).params.campaignId;
};
