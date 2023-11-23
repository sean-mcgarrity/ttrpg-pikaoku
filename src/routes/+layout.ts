import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { extractData } from '$lib/utils/requests.js';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from 'types/database/index.js';

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const campaigns = extractData(await supabase.from('campaigns').select('*').eq('archived', false));

  return { supabase, session, campaigns };
};
