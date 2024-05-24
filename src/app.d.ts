import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import type { Database } from '../types/database';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession: () => Promise<Session | null>;
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
      profile: Profile | null;
    }
    interface PageData {
      user: User | null;
      supabase: SupabaseClient<Database>;
      profile: Profile | null;
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
  notes?: (Row<'quest_note'> & Record<'author', Profile>)[];
};

export type Campaign = Row<'campaign'> & {
  features: Row<'campaign_features'>[];
};

export type Imbuement = Row<'mp_imbuements'>;

export type Pf2eSuccessCard = Row<'pf2e_success_card'> & {
  child_card?: Omit<Row<'pf2e_success_card'>, 'child_card_id'>;
};

export type Profile = Row<'profile'>;

export type Character = Row<'character'> & {
  owner?: Row<'profile'>;
};
