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

const fetchPages = async() => {
  const res: Content[] = await req.getJson({
    url: '/admin/api/pages'
  });
  return res;
};

// const updatePage = async (id: string, payload: TPayload) => {
//   const res: Content = await req.put({
//     url: `/admin/api/pages/${id}`,
//     payload: {
//       title: payload.title,
//       body: payload.body === null || payload.body === undefined ? '' : String(payload.body),
//       excerpt: payload.excerpt === null || payload.excerpt === undefined ? '' : String(payload.excerpt),
//       status: payload.status,
//       visibility: payload.visibility,
//       type: payload.type,
//     },
//   });
//   return res;
// };

export function useFetchPages() {
  return useMutation({
    mutationKey: ['FETCH_PAGES'],
    mutationFn: async () => {
      try {
        return await fetchPages();
      } catch (error: any) {
        console.error('FETCH_PAGES_ERROR', error);
        throw new Error('An unexpected error occurred');
      }
    },
  });
}

const updatePage = async (id: string, payload: TPayload) => {
  const res = await req.putJson({
    url: `/admin/pages/${id}/edit`,
    payload,
  });
  return res;
};

const createPage = async (payload: TPayload) => {
  const res = await req.postJson({
    url: `/admin/pages/create`,
    payload,
  });
  return res;
};

export function useUpdatePage() {
  return useMutation({
    mutationKey: ['EDIT_PAGE'],
    mutationFn: async ({ id, payload }: { id: string; payload: TPayload }) => {
      try {
        const response = await updatePage(id, payload);
        return response;
      } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FETCH_PAGES'] });
    },    
  });
}

export function useCreatePage() {
  return useMutation({
    mutationKey: ['CREATE_PAGE'],
    mutationFn: async ({ payload }: { payload: TPayload }) => {
      try {
        const response = await createPage(payload);
        return response;
      } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FETCH_PAGES'] });
    },    
  });
}
