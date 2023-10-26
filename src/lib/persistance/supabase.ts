import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getSupbase = () => {
  const currentPage = get(page);
  return currentPage.data.supabase as SupabaseClient;
};
