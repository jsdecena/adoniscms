import Form from '~/lib/create-form';
import { useLogin } from '../_hooks';
import { useState } from 'react';
import { PayloadSchema } from '../_types';
import LoginFormFields from './LoginFormFields';
import { router } from '@inertiajs/react';

export function LoginForm() {
  const { mutate } = useLogin();
  const [error, setError] = useState<string>();

  const onSubmit = (v: typeof INIT_FORM): void => {
    mutate(v, {
      onSuccess: () => {
        setError(undefined);
        router.visit('/partners/otp?email=' + encodeURIComponent(v.email))
      },
      onError: () => {
        setError('If we found a matching account for your email, we\'ve sent you a One-Time Password (OTP). Please check your inbox.');
      },
    });
  };

  const INIT_FORM = {
    email: '',
  };

  return (
    <Form
        onSubmit={onSubmit}
        className="space-y-4"
        zodSchema={PayloadSchema}
        defaultValues={INIT_FORM}
    >
        {error && (<p className='text-green-600'>{error}</p>)}
        <LoginFormFields />
        <button 
            type="submit"
            className="btn btn-social w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-md bg-fuchsia-600 text-white hover:bg-fuchsia-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Submit
        </button>
    </Form>
  );
}