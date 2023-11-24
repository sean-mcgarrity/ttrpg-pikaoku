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
        .select('*, campaign:campaign_id(*)')
        .eq('id', inviteToken)
        .single()
    );
    return {
      invite: invite
    };
  } catch (e) {
    console.log('something went wrong loading invite');
    throw redirect(303, '/');
  }

  // const invite =
};
