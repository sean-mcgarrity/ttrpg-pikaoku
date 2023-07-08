import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://olzutuliykdpdtmknhxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9senV0dWxpeWtkcGR0bWtuaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NTE1MzIsImV4cCI6MjAwNDQyNzUzMn0.IuygV0a-lu8C5cYTsbKtVrSZzu72Behwy6Fw3TAbS8c'
);
