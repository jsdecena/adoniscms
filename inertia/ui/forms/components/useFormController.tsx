import type React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { getUseStateValue } from '~/utils';

interface Props {
  Component: React.ComponentType<any>;
  props: any;
}
function useFormController({ Component, props }: Props): React.JSX.Element {
  const { control } = useFormContext() ?? {};

  if (!props.register) {
    return <Component {...props} />;
  }

  return (
    <Controller
      control={control}
      name={props.register.name}
      render={({ field: { onChange, value, name } }) => (
        <Component
          {...props}
          name={name}
          value={value}
          onChange={($v: React.SetStateAction<typeof value>) => {
            const v = getUseStateValue(value, $v);
            onChange(v[name as keyof typeof value]);
          }}
        />
      )}
    />
  );
}

export default useFormController;
