import { type ReactNode } from 'react';

import FormError from './_FormError';
import FormLabel from './_FormLabel';

interface Props {
  children: ReactNode;
  label?: string | boolean;
  description?: string;
  required?: boolean;
  error: string | undefined;
}
const FormLayout = ({
  children,
  label,
  description,
  required,
  error,
}: Props): React.JSX.Element => {
  return (
    <div className="relative w-full">
      {/* Label */}
      <FormLabel label={label} description={description} required={required} />

      {/* Field */}
      <div className="relative w-full">{children}</div>

      {/* Error */}
      <FormError error={error} />
    </div>
  );
};

export default FormLayout;
