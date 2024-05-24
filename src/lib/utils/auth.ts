import { page } from '$app/stores';
import type { AuthSession } from '@supabase/supabase-js';
import { derived } from 'svelte/store';

export const isAdmin = (session: AuthSession) => {
  return session?.user?.email === 'pikaoku@gmail.com';
};

export const session = derived(page, ($page) => $page.data.session);

export const supabase = derived(page, ($page) => $page.data.supabase);

export const authenticated = derived(session, ($session) => !!$session);

export const user = derived(session, ($session) => $session?.user);

export const userIsAdmin = derived(session, ($session) => isAdmin($session));
