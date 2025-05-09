import type React from 'react';

import clsx from 'clsx';

interface Props {
  label?: string | boolean;
  description?: string;
  required?: boolean;
  className?: string;
}

const FormLabel = ({ label, description, required, className }: Props): React.JSX.Element => {
  if (!label) return <></>;

  return (
    <label className={clsx('mb-1 text-sm font-medium text-gray-dark', className)}>
      {label} {required && <span className="text-red-600">*</span>}
      {description && <span className="text-xs font-light italic text-gray">({description})</span>}
    </label>
  );
};

export default FormLabel;
