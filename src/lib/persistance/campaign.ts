import { extractData } from '$lib/utils/requests';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import { supabase } from '$lib/utils/auth';
import type { TablesUpdate } from '$types/database';

export const getCampaigns = () => {
  return createQuery({
    queryKey: ['campaigns'],
    queryFn: async () =>
      extractData(
        await get(supabase)
          .from('campaign')
          .select('*')
          .order('created_at', { ascending: false })
          .filter('archived', 'eq', false)
      )
  });
};

export const getCampaign = (campaignId: number) => {
  return createQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: async () =>
      extractData(
        await get(supabase)
          .from('campaign')
          .select('*, features:campaign_features(*)')
          .eq('id', campaignId)
          .single()
      ),
    staleTime: 1000 * 60 * 10
  });
};

export const getCampaignIdFromRoute = () => {
  const { campaignId } = get(page).params;
  if (!campaignId) throw new Error('No campaignId found in route');
  return campaignId;
};

export const getCurrentCampaign = () => {
  const campaignId = parseInt(getCampaignIdFromRoute());
  return getCampaign(campaignId);
};

export const updateCurrentCampaign = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignIdFromRoute();
  return createMutation({
    mutationKey: ['campaigns', campaignId],
    mutationFn: async (campaign: TablesUpdate<'campaign'>) => {
      return get(supabase).from('campaign').update(campaign).eq('id', campaignId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    }
  });
};

export const getCharactersQuery = () => {
  const campaignId = getCampaignIdFromRoute();
  return createQuery({
    queryKey: ['campaigns', campaignId, 'characters'],
    queryFn: async () =>
      extractData(
        await get(supabase)
          .from('character')
          .select('* owner:users(*)')
          .eq('campaign', campaignId)
          .order('created_at', { ascending: false })
      )
  });
};

export const enableCampaignFeatureFlag = () => {
  const queryClient = useQueryClient();
  const campaignId = parseInt(getCampaignIdFromRoute());
  return createMutation({
    mutationKey: ['campaigns', campaignId],
    mutationFn: async (feature: string) => {
      return get(supabase).from('campaign_features').insert({ campaign_id: campaignId, feature });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId]);
    }
  });
};

export const disableCampaignFeatureFlag = () => {
  const queryClient = useQueryClient();
  const campaignId = parseInt(getCampaignIdFromRoute());
  return createMutation({
    mutationKey: ['campaigns', campaignId],
    mutationFn: async (feature: string) => {
      return get(supabase)
        .from('campaign_features')
        .delete()
        .eq('campaign_id', campaignId)
        .eq('feature', feature);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId]);
    }
  });
};

export const deleteCharacterMutation = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignIdFromRoute();
  return createMutation({
    mutationKey: ['campaigns', campaignId, 'characters'],
    mutationFn: async (characterId: number) => {
      return get(supabase).from('character').delete().eq('id', characterId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId, 'characters']);
    }
  });
};

export const mutateCreateCharacter = () => {
  const queryClient = useQueryClient();
  const campaignId = getCampaignIdFromRoute();
  return createMutation({
    mutationKey: ['campaigns', campaignId, 'characters'],
    mutationFn: async (character: TablesUpdate<'character'>) => {
      return get(supabase)
        .from('character')
        .insert({ ...character, campaign: parseInt(campaignId) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId, 'characters']);
    }
  });
};
