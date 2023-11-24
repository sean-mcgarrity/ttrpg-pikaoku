import { extractData } from '$lib/utils/requests';
import { redirect, error } from '@sveltejs/kit';

// export const GET = async (event) => {
//   const {
//     url,
//     locals: { supabase }
//   } = event;
//   const code = url.searchParams.get('code') as string;
//   const next = url.searchParams.get('next') ?? '/';

//   if (code) {
//     const { error } = await supabase.auth.exchangeCodeForSession(code);
//     if (!error) {
//       throw redirect(303, `/${next.slice(1)}`);
//     }
//   }

//   // return the user to an error page with instructions
//   throw redirect(303, '/auth/auth-code-error');
// };

export const POST = async (event) => {
  const token = event.url.searchParams.get('token');

  if (!token) {
    throw error(400);
  }

  const {
    locals: { supabase, getSession }
  } = event;

  const session = await getSession();

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

  const response = await supabase.from('campaign_members').insert({
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
