import { invalidateAll } from '$app/navigation';
import { page } from '$app/stores';
import { supabase } from '$lib/utils/auth';
import { extractData } from '$lib/utils/requests';
import type { TablesUpdate } from '$types/database';
import { createMutation, createQuery } from '@tanstack/svelte-query';
import { get } from 'svelte/store';

export const getUserProfile = () => {
  const userId = get(page).data?.session?.user?.id;
  return createQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return extractData(await get(supabase).from('profile').select('*').eq('id', userId).single());
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24
  });
};

export const updateUserProfile = () => {
  return createMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (profile: TablesUpdate<'profile'>) => {
      return extractData(
        await get(supabase).from('profile').update(profile).eq('id', profile.id).single()
      );
    },
    onSuccess: () => invalidateAll()
  });
};
