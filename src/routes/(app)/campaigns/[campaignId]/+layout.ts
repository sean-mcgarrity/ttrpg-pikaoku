import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends, params, parent }) => {
  const { session, supabase } = await parent();

  const { campaignId } = params;

  if (!session) {
    throw redirect(303, '/');
  }

  const response = await supabase
    .from('campaigns')
    .select('*, features:campaign_features(*)')
    .eq('id', campaignId)
    .single();

  if (!response.error) {
    return { ...(data ?? {}), campaign: response.data };
  }
};
