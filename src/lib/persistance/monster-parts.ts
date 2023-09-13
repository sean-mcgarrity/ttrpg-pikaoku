import { page } from '$app/stores';
import type { MP_Refinement, MP_UsableSource } from '$lib/systems/pf2e_monster_parts';
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

export const getSourcesForItems = (requirements: string[]) => {
  const currentPage = get(page);
  const supabase: SupabaseClient = currentPage.data.supabase;
  const itemId = currentPage.params.itemId;
  return createQuery<MP_UsableSource[]>({
    queryKey: ['usable_sources', itemId],
    queryFn: async () =>
      extractData(
        await supabase
          .from('usable_sources')
          .select('*')
          .gt('usable', 0)
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
