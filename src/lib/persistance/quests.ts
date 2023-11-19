import { goto } from '$app/navigation';
import { getCampaignId } from '$lib/utils/contextual-helpers';
import { extractData, getSupabase } from '$lib/utils/requests';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import type { Database } from 'types/database';

export const getQuestsQuery = () => {
  const supabase = getSupabase();
  const campaignId = getCampaignId();
  return createQuery({
    queryKey: ['quests', campaignId],
    queryFn: async () => {
      return extractData(
        await supabase
          .from('quest')
          .select('*, notes:quest_note (*)')
          .eq('campaign_id', campaignId)
          .order('name')
      );
    },
    staleTime: 1000 * 60 * 60 * 24
  });
};

type CreateQuestParams = Omit<Database['public']['Tables']['quest']['Insert'], 'campaign_id'>;
export const createQuestMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignId();
  return createMutation<unknown, unknown, CreateQuestParams>({
    mutationKey: ['quests', campaignId, 'create'],
    mutationFn: async (input) => {
      const supabase = getSupabase();
      const campaignId = getCampaignId();
      const response = await supabase.from('quest').insert({
        ...input,
        campaign_id: campaignId
      });
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
      return extractData(response);
    }
  });
};

export const getPinnedQuestsQuery = () => {
  const supabase = getSupabase();
  const campaignId = getCampaignId();
  return createQuery({
    queryKey: ['quests', campaignId, 'pinned'],
    queryFn: async () => {
      const campaignId = getCampaignId();
      return extractData(
        await supabase
          .from('quest')
          .select('*, notes:quest_note (*)')
          .eq('campaign_id', campaignId)
          .eq('pinned', true)
          .eq('finished', false)
          .order('name')
      );
    },
    staleTime: 1000 * 60 * 60 * 24
  });
};

export const getQuestQuery = (questId: string | number) => {
  const supabase = getSupabase();
  return createQuery({
    queryKey: ['quests', questId],
    queryFn: async () => {
      return extractData(await supabase.from('quest').select('*').eq('id', questId).single());
    }
  });
};

type CreateNoteParams = Database['public']['Tables']['quest_note']['Insert'];
export const addQuestNoteMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignId();
  return createMutation<unknown, unknown, CreateNoteParams>({
    mutationKey: ['quests', campaignId, 'add-note'],
    mutationFn: async (input) => {
      const supabase = getSupabase();
      const response = await supabase.from('quest_note').insert(input);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
      return extractData(response);
    }
  });
};

export const updateQuestMutation = () => {
  const supabase = getSupabase();
  return createMutation<unknown, unknown, Database['public']['Tables']['quest']['Update']>({
    mutationKey: ['quests', 'update'],
    mutationFn: async (input) => {
      const response = await supabase.from('quest').update(input).eq('id', input.id);
      if (response.error) {
        throw response.error;
      }

      return extractData(response);
    },
    onSuccess: () => {
      const queryClient = useQueryClient();
      const campaignId = getCampaignId();
      queryClient.invalidateQueries(['quests', campaignId]);
    }
  });
};

export const deleteQuestMutation = () => {
  const supabase = getSupabase();
  const queryClient = useQueryClient();
  return createMutation({
    mutationKey: ['quests', 'delete'],
    mutationFn: async (questId: number) => {
      const response = await supabase.from('quest').delete().eq('id', questId);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
    }
  });
};

export const deleteQuestNoteMutation = () => {
  const supabase = getSupabase();
  const queryClient = useQueryClient();
  return createMutation({
    mutationKey: ['quests', 'delete-note'],
    mutationFn: async (noteId: number) => {
      const response = await supabase.from('quest_note').delete().eq('id', noteId);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
    }
  });
};
