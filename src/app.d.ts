import type { Database } from '../types/database';

declare namespace App {
  export interface Locals {
    supabase: import('@supabase/supabase-js').SupabaseClient<Database>;
    getSession: () => Promise<any>;
  }

  // interface PageData {}

  // interface Platform {}
}

export type Row<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Tables = Database['public']['Tables'];

export type Quest = Row<'quest'> & {
  notes?: Row<'quest_note'>[];
};
