import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Book, BookPreferences } from '../backend';
import { ExternalBlob } from '../backend';

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

export function useGetCallerBookPreferences() {
  const { actor, isFetching } = useActor();

  return useQuery<BookPreferences | null>({
    queryKey: ['bookPreferences'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerBookPreferences();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCallerBookPreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (genres: string[]) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerBookPreferences(genres);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookPreferences'] });
    },
  });
}

export function useGetSampleBooks() {
  const { actor, isFetching } = useActor();

  return useQuery<Book[]>({
    queryKey: ['sampleBooks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSampleBooks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitSellRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      author,
      price,
      coverImage,
    }: {
      title: string;
      author: string;
      price: bigint;
      coverImage: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitSellRequest(title, author, price, coverImage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellRequests'] });
    },
  });
}

export function useGetBookCatalog() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, Book]>>({
    queryKey: ['bookCatalog'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookCatalog();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBook() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      author,
      price,
      coverImage,
    }: {
      id: string;
      title: string;
      author: string;
      price: bigint;
      coverImage: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBook(id, title, author, price, coverImage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookCatalog'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
