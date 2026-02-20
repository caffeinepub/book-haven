import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Book } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetBookCatalog() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, Book]>>({
    queryKey: ['bookCatalog'],
    queryFn: async () => {
      console.log('useGetBookCatalog: Fetching catalog from backend...');
      if (!actor) {
        console.log('useGetBookCatalog: Actor not available, returning empty array');
        return [];
      }
      
      try {
        const catalog = await actor.getBookCatalog();
        console.log('useGetBookCatalog: Received catalog:', catalog);
        console.log('useGetBookCatalog: Number of books:', catalog?.length || 0);
        
        if (catalog && catalog.length > 0) {
          console.log('useGetBookCatalog: Book titles:', catalog.map(([id, book]) => book.title));
        } else {
          console.warn('useGetBookCatalog: ⚠️ Backend returned empty catalog!');
          console.warn('useGetBookCatalog: Expected 12 books but got 0');
        }
        
        return catalog;
      } catch (error) {
        console.error('useGetBookCatalog: Error fetching catalog:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (!actor) return 'guest';
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
