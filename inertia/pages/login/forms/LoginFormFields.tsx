import { useFormHelper } from '~/lib/create-form';
import { FormInput } from '~/ui/forms';

import { PayloadSchema } from '../_types';

function LoginFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormHelper(PayloadSchema);

  console.log(errors, 'ERRORS')
  return (
    <>
    <FormInput
      id="email"
      label="Enter your email"
      register={register('email')}
      placeholder="user@example.com"
      error={errors?.email?.message ?? ''}
      type='email'
    />
    <FormInput
      id="password"
      label="Enter your password"
      register={register('password')}
      placeholder="*******"
      error={errors?.password?.message ?? ''}
      type='password'
    />        
    </>
  );
}

export default LoginFormFields;