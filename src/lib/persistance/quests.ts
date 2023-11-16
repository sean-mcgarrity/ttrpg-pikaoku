import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { getCampaignId } from '$lib/utils/contextual-helpers';
import { extractData, getSupabase } from '$lib/utils/requests';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { get } from 'svelte/store';

export const getQuestsQuery = () => {
  const campaignId = getCampaignId();
  const supabase = getSupabase();
  return createQuery({
    queryKey: ['quests', campaignId],
    queryFn: async () => {
      return extractData(await supabase.from('quests').select('*'));
    }
  });
};

export const createQueryMutation = () => {
  return createMutation({
    mutationKey: ['quests', 'create'],
    mutationFn: async (quest: any) => {
      
    }
  });
};
