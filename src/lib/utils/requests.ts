import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { page } from '$app/stores';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from 'src/database.types';
import { get } from 'svelte/store';

export const getSupabase = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient<Database> = currentPage.data.supabase;
  return supabase;
};

export function extractData<T>(response: PostgrestSingleResponse<T>) {
  if (response.status === 204) {
    return null;
  }
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

type ExpectedParams = 'itemId' | 'campaignId';
export function getParam(param: ExpectedParams) {
  const currentPage = get(page);
  return currentPage.params[param];
}
