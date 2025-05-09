import { useMutation } from '@tanstack/react-query';
import { getQueryClient, req } from '~/api';

import { Content, TPayload } from './_types';

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

// const createCategory = async (payload: TPayload) => {
//   const res: CategoryResponse = await req.post({
//     url: '/partners/categories/create',
//     payload: {
//       name: payload.name,
//       description: payload.description || '',
//       color: payload.color || '',
//     }
//   });

//   return res;
// };

// const updateCategory = async (id: string, payload: TPayload) => {
//   const res: CategoryResponse = await req.put({
//     url: `/partners/categories/edit/${id}`,
//     payload: {
//       name: payload.name,
//       description: payload.description || '',
//       color: payload.color || '',
//     }
//   });

//   return res;
// };

// const deleteCategories = async (id: string) => {
//   const res: CategoryResponse = await req.remove({
//     url: `/partners/categories/delete/${id}`
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

// export function useCreateCategory() {
//   return useMutation({
//     mutationKey: ['CREATE_CATEGORIES'],
//     mutationFn: async (payload: TPayload) => {
//       try {
//         const response = await createCategory(payload);
//         return response;
//       } catch (error: any) {
//         console.error('CREATE_CATEGORIES_ERROR', error);
//         throw new Error('An unexpected error occurred');
//       }
//     },
//   });
// }

// export function useUpdateCategory() {
//   return useMutation({
//     mutationKey: ['UPDATE_CATEGORIES'],
//     mutationFn: async ({ id, payload }: { id: string; payload: TPayload }) => {
//       try {
//         const response = await updateCategory(id, payload);
//         return response;
//       } catch (error: any) {
//         console.error('UPDATE_CATEGORIES_ERROR', { error });
//         throw new Error(error.message || 'An unexpected error occurred');
//       }
//     },
//   });
// }

// export function useDeleteCategory() {
//   const queryClient = getQueryClient();
//   return useMutation({
//     mutationKey: ['DELETE_CATEGORIES'],
//     mutationFn: async ({ id }: { id: string }) => {
//       try {
//         const response = await deleteCategories(id);
//         return response;
//       } catch (error: any) {
//         console.error('DELETE_CATEGORIES_ERROR', { error });
//         throw new Error(error.message || 'An unexpected error occurred');
//       }
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['CATEGORIESs'] });
//     },
//   });
// }
