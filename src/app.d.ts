import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import type { Database, Tables } from '../types/database';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession: () => Promise<Session | null>;
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
      profile: Tables<'profile'> | null;
    }
    interface PageData {
      user: User | null;
      supabase: SupabaseClient<Database>;
      profile: Tables<'profile'> | null;
      session: Session | null;
    }
  }

  // interface PageData {}

  // interface Platform {}
}
