import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { extractData } from '$lib/utils/requests.js';
import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import type { Database } from 'types/database/index.js';

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session);
        }

        const cookie = combineChunks(key, (name) => {
          const cookies = parse(document.cookie);
          return cookies[name];
        });
        return cookie;
      }
    }
  });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const campaigns = extractData(await supabase.from('campaigns').select('*').eq('archived', false));

  return { supabase, session, campaigns };
};
