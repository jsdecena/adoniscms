import React from 'react';

import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Input, Label } from '../../lib/shadcn';
import { cn, getUseStateValue } from '../../utils';

type TCommonProps = {
  id?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  labelAction?: React.ReactNode;
  type?: 'email' | 'password' | 'text' | 'number' | 'checkbox' | 'hidden';
  className?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
};

type TProps = TCommonProps &
  (
    | {
        name: string;
        value: string;
        register?: never;
        onChange: React.Dispatch<React.ChangeEvent<HTMLInputElement>>;
      }
    | {
        name?: never;
        value?: never;
        onChange?: never;
        register: FieldValues;
      }
  );

const InputComponent = ({
  id,
  name,
  label,
  error,
  onChange,
  type = 'text',
  labelAction,
  ...rest
}: TProps) => {
  const isOnChange = typeof onChange === 'function';
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOnChange) {
      onChange(e);
      return;
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col space-y-1.5">
        {(label || labelAction) && (
          <div className="flex items-center">
            {label && (
              <Label htmlFor={id ?? name}>
                {label}
                {rest?.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
            )}
            {labelAction && labelAction}
          </div>
        )}
        <div className="relative">
          <Input
            required={rest?.required}
            disabled={rest?.disabled}
            placeholder={rest?.placeholder}
            id={id ?? name}
            onChange={handleOnChange}
            className={cn('pr-8')}
            type={
              type === 'password'
                ? `${showPassword ? 'text' : 'password'}`
                : type
            }
            maxLength={rest?.maxLength}
            {...rest}
          />
          <>
            {type === 'password' && (
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-[10px] top-0 flex h-full cursor-pointer items-center justify-center"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            )}
          </>
        </div>
      </div>
      {error && (
        <div className="my-1 flex w-full text-white bg-red-500 p-2">
          <div className="ml-auto inline-flex items-center gap-1">
            <CircleAlert className="h-3 w-3" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

function FormInputColorPicker({ register, onChange, ...rest }: TProps) {
  const { control } = useFormContext() ?? {};
  return (
    <>
      {register && !onChange ? (
        <Controller
          control={control}
          name={register?.name}
          render={({ field: { onChange, value, name } }) => (
            <InputComponent
              {...rest}
              name={name}
              value={value || ''}
              onChange={($v: React.SetStateAction<typeof value>) => {
                const v = getUseStateValue(value, $v);
                onChange(v[name]);
              }}
            />
          )}
        />
      ) : (
        <InputComponent
          onChange={onChange}
          name={rest?.name ?? ''}
          value={rest?.value ?? ''}
          {...rest}
        />
      )}
    </>
  );
}

export default FormInputColorPicker;
