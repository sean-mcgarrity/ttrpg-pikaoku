import { page } from '$app/stores';
import { get } from 'svelte/store';

export const getCampaignId = () => {
  const fromQuery = get(page).params.campaignId;
  if (fromQuery) return parseInt(fromQuery);
  throw new Error('Campaign ID not found in query params');
};

export const getCampaignFromPage = () => {
  return get(page).data.campaign;
};

export const getQuestsFromPage = () => {
  return get(page).data.quests;
};
