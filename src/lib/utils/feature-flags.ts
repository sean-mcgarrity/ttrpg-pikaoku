import type { Campaign } from '$lib/systems/meta';

export function hasFeatureFlag(campaign: Campaign, flag: string) {
  return campaign.features.some((feature) => feature.feature === flag);
}
