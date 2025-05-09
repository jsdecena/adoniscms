import { useFormHelper } from '~/lib/create-form';
import { FormInput } from '~/ui/forms';

import { PayloadSchema } from '../_types';

function LoginFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormHelper(PayloadSchema);

  return (
    <FormInput
      id="email"
      label="Enter your email"
      register={register('email')}
      placeholder="user@example.com"
      error={errors?.email?.message ?? ''}
      type='email'
    />
  );
}

export default LoginFormFields;