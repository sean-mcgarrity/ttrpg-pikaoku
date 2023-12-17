import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from '../types/database';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession: () => Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
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

export type Imbuement = Row<'mp_imbuements'>;
