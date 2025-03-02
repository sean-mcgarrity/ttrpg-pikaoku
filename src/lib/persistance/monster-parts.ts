import { goto } from '$app/navigation';
import { page } from '$app/stores';
import {
  calculateRefinementProgress,
  getMonsterPartsForLevel,
  calculateImbuementSalvageCost,
  type Imbuement,
  type MP_BaseItem,
  type MP_Refinement,
  type MP_UsableSource
} from '$lib/systems/pf2e_monster_parts';
import { supabase } from '$lib/utils/auth';
import { extractData } from '$lib/utils/requests';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  createMutation,
  createQuery,
  useQueryClient
} from '@tanstack/svelte-query';
import { get } from 'svelte/store';

export const getCurrentItem = () => {
  const currentPage = get(page);
  const itemId = parseInt(currentPage.params.itemId);
  return createQuery({
    queryKey: ['refinements', itemId],
    queryFn: async () => {
      if (!itemId) return null;
      return extractData(
        await get(supabase)
          .from('mp_refinements')
          .select(
            `*, base_item:mp_base_items (*), changes:mp_refinement_changes (*, source:mp_sources (*)), imbuements:mp_imbuements!mp_refinement_imbuements (*), owner:character (*)`
          )
          .eq('id', itemId)
          .single<MP_Refinement>()
      );
    },
    retry: false
  });
};

export const getRefinementsForCampaign = () => {
  const currentPage = get(page);
  const { campaignId } = currentPage.params;
  return createQuery({
    queryKey: ['refinements'],
    queryFn: async () =>
      extractData(
        await get(supabase)
          .from('mp_refinements')
          .select(
            `*, base_item:mp_base_items (*), changes:mp_refinement_changes (*), imbuements:mp_imbuements!mp_refinement_imbuements (*), owner:character (*)`
          )
          .eq('campaign_id', campaignId)
          .eq('salvaged', false)
      )
  });
};

export const updateRefinement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const itemId = currentPage.params.itemId;
  return createMutation(
    ['refinements', itemId],
    async (refinement: Partial<MP_Refinement>) => {
      return get(supabase)
        .from('mp_refinements')
        .update(refinement)
        .eq('id', itemId);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(['refinements']);
      }
    }
  );
};

export const queryMpBaseItems = () => {
  return createQuery({
    queryKey: ['base_items'],
    queryFn: async () =>
      extractData(
        (await get(supabase)
          .from('mp_base_items')
          .select('*')
          .order('name', { ascending: true })) as any
      )
  });
};

export const getSourceFromParam = () => {
  const currentPage = get(page);
  const { campaignId, sourceId } = currentPage.params;
  return createQuery<MP_UsableSource>({
    queryKey: ['mp_sources', sourceId],
    queryFn: async () => {
      if (!sourceId) return null;
      return extractData(
        await get(supabase)
          .from('mp_sources')
          .select('*')
          .eq('id', sourceId)
          .eq('campaign_id', campaignId)
          .single<MP_UsableSource>()
      );
    }
  });
};

export const getUsableSourceById = (sourceId: number | string) => {
  const currentPage = get(page);
  return createQuery<MP_UsableSource>({
    queryKey: ['mp_sources', sourceId],
    queryFn: async () => {
      if (!sourceId) return null;
      return extractData(
        await get(supabase)
          .from('usable_sources')
          .select('*')
          .eq('id', sourceId)
          .single<MP_UsableSource>()
      );
    },
    retry: 2
  });
};

export const revealSource = (sourceId) => {
  const queryClient = useQueryClient();
  return createMutation(
    ['reveal_source', sourceId],
    async () => {
      return get(supabase)
        .from('mp_sources')
        .update({ revealed: true })
        .eq('id', sourceId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['usable_sources']);
        queryClient.invalidateQueries(['mp_sources']);
      }
    }
  );
};

export const updateSource = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const sourceId = currentPage.params.sourceId;
  return createMutation(
    ['usable_sources', sourceId],
    async (source: Partial<MP_UsableSource>) => {
      const { total, usable, ...data } = source;
      return supabase.from('mp_sources').update(data).eq('id', sourceId);
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

export const getUsableSourcesPreview = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { campaignId } = currentPage.params;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['usable_sources', 'preview'],
    queryFn: async () =>
      extractData(
        await supabase
          .from('usable_sources')
          .select('*')
          .gt('usable', 0)
          .eq('campaign_id', campaignId)
          .order('usable', { ascending: false })
          .limit(4)
      )
  });
};

export const getUnusableSources = () => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { campaignId } = currentPage.params;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['usable_sources', 'depleted'],
    queryFn: async () =>
      extractData(
        await supabase
          .from('usable_sources')
          .select('*')
          .lte('usable', 0)
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

export const mutateCreateRefinement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const { campaignId } = currentPage.params;
  return createMutation(
    ['refinements'],
    async (refinement: Partial<MP_Refinement>) => {
      return supabase
        .from('mp_refinements')
        .insert({ ...refinement, campaign_id: campaignId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
      }
    }
  );
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
      return supabase.from('mp_refinement_changes').insert({
        source_id: sourceId,
        refinement_id: itemId,
        imbuement_id: imbuementId,
        amount
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(['refinements']);
        queryClient.invalidateQueries(['usable_sources']);
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
    async ({
      name,
      level,
      quantity,
      enables,
      img_src
    }: Partial<MP_UsableSource>) => {
      return supabase.from('mp_sources').insert({
        name,
        level,
        quantity,
        enables,
        remaining: getMonsterPartsForLevel(level),
        campaign_id: campaignId,
        img_src
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
        queryClient.invalidateQueries(['usable_sources']);
      }
    }
  );
};

export const deleteMpSource = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createMutation(
    ['delete-source'],
    async (sourceId: number) => {
      return supabase.from('mp_sources').delete().eq('id', sourceId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
        queryClient.invalidateQueries(['usable_sources']);
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
      extractData(
        await supabase
          .from('mp_imbuements')
          .select('*')
          .order('name', { ascending: true })
      )
  });
};

export const getImbuementsOfType = (type: string) => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createQuery<Imbuement[]>({
    queryKey: ['imbuements', type],
    queryFn: async () =>
      extractData(
        await supabase
          .from('mp_imbuements')
          .select('*')
          .order('name', { ascending: true })
          .eq('type', type)
      )
  });
};

export const deleteRefinementImbuement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createMutation(
    ['remove_imbuement'],
    async ({ imbuementId, refinementId }: Record<string, number>) => {
      return supabase
        .from('mp_refinement_imbuements')
        .delete()
        .eq('refinement_id', refinementId)
        .eq('imbuement_id', imbuementId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
      }
    }
  );
};

export const deleteRefinementChange = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createMutation(
    ['remove_change'],
    async (changeId: number) => {
      return supabase.from('mp_refinement_changes').delete().eq('id', changeId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
        queryClient.invalidateQueries(['usable_sources']);
      }
    }
  );
};

export const duplicateImbuement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createMutation(
    ['duplicate_imbuement'],
    async (imbuementId: number) => {
      const resp = await supabase
        .from('mp_imbuements')
        .select('*')
        .eq('id', imbuementId)
        .single();
      if (resp.error) {
        throw new Error(resp.error.message);
      }
      const { created_at, id, ...data } = resp.data;
      return supabase.from('mp_imbuements').insert({
        ...data,
        name: `${data.name} (Copy)`
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(['imbuements']);
      }
    }
  );
};

export const insertRefinementImbuement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  return createMutation(
    ['add_imbuement'],
    async ({ imbuementId, refinementId }: Record<string, number>) => {
      return supabase.from('mp_refinement_imbuements').insert({
        imbuement_id: imbuementId,
        refinement_id: refinementId
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
      }
    }
  );
};

export const deleteRefinement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;

  return createMutation(
    ['delete_refinement'],
    async (refinementId: number) => {
      return supabase.from('mp_refinements').delete().eq('id', refinementId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
        queryClient.invalidateQueries(['usable_sources']);
      }
    }
  );
};

export const salvageRefinement = () => {
  const queryClient = useQueryClient();
  const currentPage = get(page);

  return createMutation(
    ['salvage_refinement'],
    async (refinement: MP_Refinement) => {
      const res = await get(supabase)
        .from('mp_refinements')
        .update({ salvaged: true })
        .eq('id', refinement.id);
      if (!res.error) {
        await get(supabase)
          .from('mp_sources')
          .insert({
            name: 'Salvaged ' + refinement.name,
            level: 1,
            quantity: 1,
            enables: refinement.base_item.requires,
            remaining: calculateRefinementProgress(refinement),
            campaign_id: refinement.campaign_id,
            img_src: 'https://i.imgur.com/8jYVvC2.png',
            revealed: true
          });
        for (const imbuement of refinement.imbuements) {
          await get(supabase)
            .from('mp_sources')
            .insert({
              name: 'Salvaged ' + imbuement.name,
              level: 1,
              quantity: 1,
              enables: imbuement.requires,
              remaining: calculateImbuementSalvageCost(
                refinement,
                imbuement.id
              ),
              campaign_id: refinement.campaign_id,
              img_src: 'https://i.imgur.com/8jYVvC2.png',
              revealed: true
            });
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['refinements']);
        queryClient.invalidateQueries(['usable_sources']);
        goto(`/campaigns/${currentPage.params.campaignId}/monster-parts`);
      }
    }
  );
};
