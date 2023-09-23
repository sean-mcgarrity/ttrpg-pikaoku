import { page } from '$app/stores';
import {
  getMonsterPartsForLevel,
  type MP_Refinement,
  type MP_UsableSource
} from '$lib/systems/pf2e_monster_parts';
import { extractData } from '$lib/utils/requests';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { get } from 'svelte/store';

export const getCurrentItem = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const itemId = currentPage.params.itemId;
  return createQuery<MP_Refinement>({
    queryKey: ['refinements', itemId],
    queryFn: async () => {
      if (!itemId) return null;
      return extractData(
        await supabase
          .from('refinements')
          .select(
            `*, base_item:mp_base_items (*), changes:refinement_changes (*), imbuements!refinement_imbuements (*)`
          )
          .eq('id', itemId)
          .single<MP_Refinement>()
      );
    }
  });
};

export const getRefinementsForCampaign = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { campaignId } = currentPage.params;
  return createQuery<MP_Refinement[]>({
    queryKey: ['refinements'],
    queryFn: async () =>
      extractData(
        await supabase
          .from('refinements')
          .select(
            `*, base_item:mp_base_items (*), changes:refinement_changes (*), imbuements!refinement_imbuements (*)`
          )
          .eq('campaign_id', campaignId)
      )
  });
};

export const updateRefinement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const itemId = currentPage.params.itemId;
  return createMutation(
    ['refinements', itemId],
    async (refinement: Partial<MP_Refinement>) => {
      return supabase.from('refinements').update(refinement).eq('id', itemId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements', itemId]);
      }
    }
  );
};

export const getSourceFromParam = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { campaignId, sourceId } = currentPage.params;
  return createQuery<MP_UsableSource>({
    queryKey: ['usable_sources', sourceId],
    queryFn: async () => {
      if (!sourceId) return null;
      return extractData(
        await supabase
          .from('usable_sources')
          .select('*')
          .eq('id', sourceId)
          .eq('campaign_id', campaignId)
          .single<MP_UsableSource>()
      );
    }
  });
};

export const updateSource = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const sourceId = currentPage.params.sourceId;
  return createMutation(
    ['usable_sources', sourceId],
    async (source: Partial<MP_UsableSource>) => {
      return supabase.from('usable_sources').update(source).eq('id', sourceId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['usable_sources']);
      }
    }
  );
};

export const getUsableSources = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { campaignId } = currentPage.params;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['usable_sources'],
    queryFn: async () =>
      extractData(
        await supabase
          .from('usable_sources')
          .select('*')
          .gt('usable', 0)
          .eq('campaign_id', campaignId)
      )
  });
};

export const getSourcesForItems = (requirements: string[]) => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { itemId, campaignId } = currentPage.params;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['usable_sources', itemId],
    queryFn: async () =>
      extractData(
        await supabase
          .from('usable_sources')
          .select('*')
          .gt('usable', 0)
          .eq('campaign_id', campaignId)
          .overlaps('enables', requirements)
      ),
    enabled: !!itemId
  });
};

export const insertRefinementChange = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const itemId = currentPage.params.itemId;
  return createMutation(
    ['refinements', itemId],
    async ({
      sourceId,
      amount,
      imbuementId
    }: {
      amount: number;
      sourceId: number;
      imbuementId?: number;
    }) => {
      return supabase.from('refinement_changes').insert({
        source_id: sourceId,
        refinement_id: itemId,
        imbuement_id: imbuementId,
        amount
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements', itemId]);
        queryClient.invalidateQueries(['usable_sources', itemId]);
      }
    }
  );
};

export const createMpSource = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { itemId, campaignId } = currentPage.params;
  return createMutation(
    ['create-source'],
    async ({ name, level, quantity, enables }: Partial<MP_UsableSource>) => {
      return supabase.from('mp_sources').insert({
        name,
        level,
        quantity,
        enables,
        remaining: getMonsterPartsForLevel(level),
        campaign_id: campaignId
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements', itemId]);
        queryClient.invalidateQueries(['usable_sources', itemId]);
      }
    }
  );
};

export const getImbuements = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['imbuements'],
    queryFn: async () =>
      extractData(await supabase.from('imbuements').select('*').order('name', { ascending: true }))
  });
};

export const getImbuementsOfType = (type: string) => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['imbuements', type],
    queryFn: async () =>
      extractData(
        await supabase
          .from('imbuements')
          .select('*')
          .order('name', { ascending: true })
          .eq('type', type)
      )
  });
};
