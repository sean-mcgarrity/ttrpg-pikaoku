import type { AuthSession } from '@supabase/supabase-js';

export const isAdmin = (session: AuthSession) => {
  return session?.user?.email === 'pikaoku@gmail.com';
};
