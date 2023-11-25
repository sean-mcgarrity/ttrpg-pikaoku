import { extractData } from '$lib/utils/requests';

// get the users profile before continuing to print
export async function load({ params, url, parent }) {
  const { supabase, session } = await parent();
  const userId = session.user.id;
  const profile = extractData(await supabase.from('profile').select('*').eq('id', userId).single());

  return {
    profile: profile
  };
}
