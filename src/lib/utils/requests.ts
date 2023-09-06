import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export function extractData<T>(response: PostgrestSingleResponse<T>) {
  if (response.status === 204) {
    return null;
  }
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
}
