import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export function extractData<R extends PostgrestSingleResponse<any>>(response: R): R['data'] {
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
