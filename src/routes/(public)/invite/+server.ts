import { extractData } from '$lib/utils/requests';
import { redirect, error } from '@sveltejs/kit';

export const POST = async (event) => {
  const token = event.url.searchParams.get('token');

  if (!token) {
    throw error(400);
  }

  const {
    locals: { supabase, session }
  } = event;

  const invite = extractData(
    await supabase
      .from('campaign_invite')
      .select('*, campaign:campaign_id(*), times_used:campaign_members(count)')
      .eq('id', token)
      .single()
  );
  const remainingUses = invite.max_uses - invite.times_used[0]['count'];

  if (!session || remainingUses <= 0 || new Date(invite.expires) < new Date()) {
    throw redirect(303, '/');
  }

  const response = await supabase.from('campaign_member').insert({
    campaign_invite_id: token,
    user_id: session.user.id,
    campaign_id: invite.campaign_id
  });

  if (response.error) {
    throw error(400, response.error.message);
  }

  return new Response(null, {
    status: 200
  });
};
