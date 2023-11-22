import { extractData, getSupabase } from '$lib/utils/requests';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { PlayerCharacter, Campaign } from '$lib/systems/meta';

export const getCampaigns = () => {
  const supabase = getSupabase();
  return createQuery({
    queryKey: ['campaigns'],
    queryFn: async () =>
      extractData(
        await supabase
          .from('campaigns')
          .select('*')
          .order('created_at', { ascending: false })
          .filter('archived', 'eq', false)
      )
  });
};

export const getCampaign = (campaignId: number) => {
  const supabase = getSupabase();
  return createQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: async () =>
      extractData(
        await supabase
          .from('campaigns')
          .select('*, features:campaign_features(*)')
          .eq('id', campaignId)
          .single()
      )
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
  const supabase = getSupabase();
  const campaignId = getCampaignIdFromRoute();
  return createMutation({
    mutationKey: ['campaigns', campaignId],
    mutationFn: async (campaign: Partial<Campaign>) => {
      return supabase.from('campaigns').update(campaign).eq('id', campaignId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    }
  });
};

export const getCharactersQuery = () => {
  const supabase = getSupabase();
  const campaignId = getCampaignIdFromRoute();
  return createQuery({
    queryKey: ['campaigns', campaignId, 'characters'],
    queryFn: async () =>
      extractData(
        await supabase
          .from('player_characters')
          .select('*')
          .eq('campaign', campaignId)
          .order('created_at', { ascending: false })
      )
  });
};

export const enableCampaignFeatureFlag = () => {
  const queryClient = useQueryClient();
  const supabase = getSupabase();
  const campaignId = parseInt(getCampaignIdFromRoute());
  return createMutation({
    mutationKey: ['campaigns', campaignId],
    mutationFn: async (feature: string) => {
      return supabase.from('campaign_features').insert({ campaign_id: campaignId, feature });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId]);
    }
  });
};

export const disableCampaignFeatureFlag = () => {
  const queryClient = useQueryClient();
  const supabase = getSupabase();
  const campaignId = parseInt(getCampaignIdFromRoute());
  return createMutation({
    mutationKey: ['campaigns', campaignId],
    mutationFn: async (feature: string) => {
      return supabase
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
  const supabase = getSupabase();
  const campaignId = getCampaignIdFromRoute();
  return createMutation({
    mutationKey: ['campaigns', campaignId, 'characters'],
    mutationFn: async (characterId: number) => {
      return supabase.from('player_characters').delete().eq('id', characterId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId, 'characters']);
    }
  });
};

export const mutateCreateCharacter = () => {
  const queryClient = useQueryClient();
  const supabase = getSupabase();
  const campaignId = getCampaignIdFromRoute();
  return createMutation({
    mutationKey: ['campaigns', campaignId, 'characters'],
    mutationFn: async (character: Partial<PlayerCharacter>) => {
      return supabase.from('player_characters').insert({ ...character, campaign: campaignId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns', campaignId, 'characters']);
    }
  });
};
