import { extractData } from '$lib/utils/requests.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, parent }) => {
  const { supabase } = await parent();
  const inviteToken = url.searchParams.get('token');

  if (!inviteToken) {
    throw redirect(303, '/');
  }

  try {
    const invite = extractData(
      await supabase
        .from('campaign_invite')
        .select('*, campaign:campaign_id(*), times_used:campaign_members(count)')
        .eq('id', inviteToken)
        .single()
    );
    const remainingUses = invite.max_uses - invite.times_used[0]['count'];
    return {
      invite: invite,
      hasExpired: new Date(invite.expires) < new Date() || remainingUses <= 0
    };
  } catch (e) {
    console.error('something went wrong loading invite');
    throw redirect(303, '/');
  }

  // const invite =
};
