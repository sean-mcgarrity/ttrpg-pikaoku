declare namespace App {
  export interface Locals {
    supabase: import('@supabase/supabase-js').SupabaseClient;
    getSession: () => Promise<any>;
  }

  // interface PageData {}

  // interface Platform {}
}
