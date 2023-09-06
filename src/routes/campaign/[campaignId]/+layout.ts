import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  console.log('yun data', data);

  const session = await data?.getSession();
  if (!session || !session.user) {
    throw redirect(303, '/');
  }

  const { supabase } = data.supabase;

  const campaign = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', data.params.campaignId)
    .single();

  return { campaign };
};
