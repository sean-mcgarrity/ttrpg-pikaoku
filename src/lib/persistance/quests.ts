import { page } from '$app/stores';
import { supabase } from '$lib/utils/auth';
import { getCampaignId } from '$lib/utils/contextual-helpers';
import { extractData } from '$lib/utils/requests';
import type { Database, TablesInsert } from '$types/database';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { get } from 'svelte/store';

export const getQuestsQuery = () => {
  const campaignId = getCampaignId();
  return createQuery({
    queryKey: ['quests', campaignId],
    queryFn: async () => {
      const test = extractData(
        await get(supabase)
          .from('quest')
          .select('*, notes:quest_note (*, author:profile (*))')
          .eq('campaign_id', campaignId)
          .order('name')
      );
      return test;
    },
    staleTime: 1000 * 60 * 60 * 24
  });
};

export const getQuestQuery = () => {
  const campaignId = getCampaignId();
  const queryClient = useQueryClient();
  const questId = get(page).params.questId;
  return createQuery({
    queryKey: ['quests', campaignId, questId],
    queryFn: async () => {
      return extractData(
        await get(supabase)
          .from('quest')
          .select('*, notes:quest_note (*, author:profile (username, avatar_src))')
          .eq('id', questId)
          .single()
      );
    },
    initialData: () =>
      (queryClient.getQueryData(['quests', campaignId]) as any)?.find(
        (q) => q.id === questId
      ) as never
  });
};

type CreateQuestParams = TablesInsert<'quest'>;
export const createQuestMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignId();
  return createMutation({
    mutationKey: ['quests', campaignId, 'create'],
    mutationFn: async (input: CreateQuestParams) => {
      const campaignId = getCampaignId();
      const response = await get(supabase)
        .from('quest')
        .insert({
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

export const createSuccessCardMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignId();
  return createMutation<
    unknown,
    unknown,
    Database['public']['Tables']['pf2e_success_card']['Insert']
  >({
    mutationKey: ['success_cards', campaignId, 'create'],
    mutationFn: async (input) => {
      const response = await get(supabase).from('pf2e_success_card').insert(input);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['success_cards']);
      return extractData(response);
    }
  });
};

export const updateSuccessCardMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignId();
  return createMutation<
    unknown,
    unknown,
    Database['public']['Tables']['pf2e_success_card']['Update']
  >({
    mutationKey: ['success_cards', campaignId, 'update'],
    mutationFn: async (input) => {
      const response = await get(supabase)
        .from('pf2e_success_card')
        .update(input)
        .eq('id', input.id);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['success_cards']);
      return extractData(response);
    }
  });
};

export const getPinnedQuestsQuery = () => {
  const campaignId = getCampaignId();
  return createQuery({
    queryKey: ['quests', campaignId, 'pinned'],
    queryFn: async () => {
      const campaignId = getCampaignId();
      return extractData(
        await get(supabase)
          .from('quest')
          .select('*, notes:quest_note (*, author:profile (username, avatar_src))')
          .eq('campaign_id', campaignId)
          .neq('status', 'deleted')
          .neq('status', 'none')
          .neq('status', 'finished')
          .order('name')
      );
    },
    staleTime: 1000 * 60 * 60 * 24
  });
};

type CreateNoteParams = Database['public']['Tables']['quest_note']['Insert'];
export const addQuestNoteMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignId();
  return createMutation<unknown, unknown, CreateNoteParams>({
    mutationKey: ['quests', campaignId, 'add-note'],
    mutationFn: async (input) => {
      const response = await get(supabase).from('quest_note').insert(input);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
      return extractData(response);
    }
  });
};

export const updateQuestMutation = () => {
  const queryClient = useQueryClient();
  return createMutation<unknown, unknown, Database['public']['Tables']['quest']['Update']>({
    mutationKey: ['quests', 'update'],
    mutationFn: async (input) => {
      const response = await get(supabase).from('quest').update(input).eq('id', input.id);
      if (response.error) {
        throw response.error;
      }
      return extractData(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quests']);
      queryClient.invalidateQueries(['quests']);
    }
  });
};

export const deleteQuestMutation = () => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationKey: ['quests', 'delete'],
    mutationFn: async (questId: number) => {
      const response = await get(supabase).from('quest').delete().eq('id', questId);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
    }
  });
};

export const deleteQuestNoteMutation = () => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationKey: ['quests', 'delete-note'],
    mutationFn: async (noteId: number) => {
      const response = await get(supabase).from('quest_note').delete().eq('id', noteId);
      if (response.error) {
        throw response.error;
      }
      queryClient.invalidateQueries(['quests']);
    }
  });
};
