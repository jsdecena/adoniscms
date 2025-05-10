import { useMutation } from '@tanstack/react-query';
import { req } from '~/api';

import { Content, TPayload } from './_types';
import { queryClient } from '~/api/store/_config';

export interface ApiResponse {
  id?: string;
  error?: string;
  message?: string;
  data?: Content[];
  meta?: any;
}

const fetchPosts = async() => {
  const res: Content[] = await req.getJson({
    url: '/admin/api/posts'
  });
  return res;
};

export function useFetchPosts() {
  return useMutation({
    mutationKey: ['FETCH_POSTS'],
    mutationFn: async () => {
      try {
        return await fetchPosts();
      } catch (error: any) {
        console.error('FETCH_POSTS_ERROR', error);
        throw new Error('An unexpected error occurred');
      }
    },
  });
}

const updatePost = async (id: string, payload: TPayload) => {
  const res = await req.putJson({
    url: `/admin/posts/${id}/edit`,
    payload,
  });
  return res;
};

const deletePost = async (id: string) => {
  const res = await req.removeJson({
    url: `/admin/posts/${id}/delete`});
  return res;
};

const createPost = async (payload: TPayload) => {
  const res = await req.postJson({
    url: `/admin/posts/create`,
    payload,
  });
  return res;
};

export function useUpdatePost() {
  return useMutation({
    mutationKey: ['EDIT_POST'],
    mutationFn: async ({ id, payload }: { id: string; payload: TPayload }) => {
      try {
        const response = await updatePost(id, payload);
        return response;
      } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FETCH_POSTS'] });
    },    
  });
}

export function useCreatePost() {
  return useMutation({
    mutationKey: ['CREATE_POST'],
    mutationFn: async ({ payload }: { payload: TPayload }) => {
      try {
        const response = await createPost(payload);
        return response;
      } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FETCH_POSTS'] });
    },    
  });
}

export function useDeletePost() {
  return useMutation({
    mutationKey: ['DELETE_POST'],
    mutationFn: async ({ id }: { id: string; }) => {
      try {
        const response = await deletePost(id);
        return response;
      } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FETCH_POSTS'] });
    },    
  });
}
