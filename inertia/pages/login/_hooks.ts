import { useMutation } from '@tanstack/react-query';
import { req } from '~/api';

import { TPayload } from './_types';

interface RegisterResponse {
  id?: string;
  error?: string;
  message?: string;
}

const action = async (payload: TPayload) => {
  const res: RegisterResponse = await req.post({
    url: '/login',
    payload,
  });

  return res;
};

export function useLogin() {
  return useMutation({
    mutationKey: ['LOGIN'],
    mutationFn: async (payload: TPayload) => {
      try {
        const response = await action(payload);
        console.log(response, 'ASDAS')
        return response;
      } catch (error: any) {
        throw new Error(error.message || 'An unexpected error occurred');
      }
    },
  });
}
