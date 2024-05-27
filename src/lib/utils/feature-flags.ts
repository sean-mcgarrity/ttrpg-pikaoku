import type { Tables } from '$types/database';

export function hasFeatureFlag(
  campaign: Record<'features', Tables<'campaign_features'>[]>,
  flag: string
) {
  return campaign.features.some((feature) => feature.feature === flag);
}
