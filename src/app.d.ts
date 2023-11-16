import type { Database } from '../types/supabase';

declare namespace App {
  export interface Locals {
    supabase: import('@supabase/supabase-js').SupabaseClient<Database>;
    getSession: () => Promise<any>;
  }

  // interface PageData {}

  // interface Platform {}
}
