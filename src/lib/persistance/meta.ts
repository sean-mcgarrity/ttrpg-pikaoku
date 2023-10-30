import { extractData } from '$lib/utils/requests';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { getSupbase } from './supabase';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { PlayerCharacter, Campaign } from '$lib/systems/meta';

export const getCampaigns = () => {
  const supabase = getSupbase();
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
  const supabase = getSupbase();
  return createQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: async () =>
      extractData(await supabase.from('campaigns').select('*').eq('id', campaignId).single())
  });
};

export const getCampaignIdFromRoute = () => {
  const { campaignId } = get(page).params;
  if (!campaignId) throw new Error('No campaignId found in route');
  return campaignId;
};

export const getCurrentCampaign = () => {
  const campaignId = getCampaignIdFromRoute();
  const supabase = getSupbase();
  return createQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: async () =>
      extractData<Campaign>(
        await supabase
          .from('campaigns')
          .select('*')
          .eq('id', campaignId)
          .order('created_at', { ascending: false })
          .single()
      ),
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000
  });
};

export const updateCurrentCampaign = () => {
  const queryClient = useQueryClient();
  const supabase = getSupbase();
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
  const supabase = getSupbase();
  const campaignId = getCampaignIdFromRoute();
  return createQuery({
    queryKey: ['campaigns', campaignId, 'characters'],
    queryFn: async () =>
      extractData<PlayerCharacter[]>(
        await supabase
          .from('player_characters')
          .select('*')
          .eq('campaign', campaignId)
          .order('created_at', { ascending: false })
      )
  });
};

export const deleteCharacterMutation = () => {
  const queryClient = useQueryClient();
  const supabase = getSupbase();
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
  const supabase = getSupbase();
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
