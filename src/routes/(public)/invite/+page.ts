import { extractData } from '$lib/utils/requests.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, parent }) => {
  const { supabase, session } = await parent();
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

    let alreadyJoined = false;

    if (!!session?.user?.id) {
      const response = extractData(
        await supabase
          .from('campaign_members')
          .select('*')
          .eq('campaign_id', invite.campaign_id)
          .eq('user_id', session.user.id)
      );
      alreadyJoined = response.length > 0;
    }

    const remainingUses = invite.max_uses - invite.times_used[0]['count'];
    return {
      invite: invite,
      hasExpired: new Date(invite.expires) < new Date() || remainingUses <= 0,
      alreadyJoined
    };
  } catch (e) {
    console.error('something went wrong loading invite', e);
    throw redirect(303, '/');
  }
};
