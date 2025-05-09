import Form from '~/lib/create-form';
import { useLogin } from '../_hooks';
import { useState } from 'react';
import { PayloadSchema } from '../_types';
import LoginFormFields from './LoginFormFields';

export function LoginForm() {
  const { mutate } = useLogin();
  const [error, setError] = useState<string>();

  const onSubmit = (v: typeof INIT_FORM): void => {
    mutate(v, {
      onSuccess: () => {
        setError(undefined);
        // 
      },
      onError: () => {
        //
      },
    });
  };

  const INIT_FORM = {
    email: 'admin@email.com',
    password: 'Sup3rSecr3t@123!'
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