import React from 'react';

import { CircleAlert } from 'lucide-react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Input, Label } from '../../lib/shadcn';
import { cn, getUseStateValue } from '../../utils';

type TCommonProps = {
  id?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  labelAction?: React.ReactNode;
  type?: 'email' | 'text' | 'number' | 'checkbox' | 'hidden' | 'tel';
  className?: string;
  disabled?: boolean;
  required?: boolean;
  maxCount?: number;
  onCountryCodeChange?: (code: string) => void;
};

type TProps<T> = TCommonProps &
  (
    | {
        name: string;
        value: string;
        register?: never;
        onChange: React.Dispatch<React.SetStateAction<T>>;
      }
    | {
        name?: never;
        value?: never;
        onChange?: never;
        register: FieldValues;
      }
  );

const countryOptions = [
  { code: '+64', flag: '🇳🇿', label: 'NZ' },
  // Add more as needed
];

const InputComponent = <T,>({
  id,
  name,
  label,
  error,
  onChange,
  type = 'text',
  labelAction,
  maxCount = 10, // <-- default to 10
  ...rest
}: TProps<T> & { maxCount?: number }) => {
  const isOnChange = typeof onChange === 'function';
  const [country, setCountry] = React.useState(countryOptions[0]);
  const [inputValue, setInputValue] = React.useState(rest?.value || '');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > maxCount) return;
    // Remove leading 0 for display only
    if (value.startsWith('0')) {
      value = value.replace(/^0+/, '');
    }
    setInputValue(value);
    if (isOnChange) {
      onChange((prev: T) => ({
        ...prev,
        [name as never]: value,
      }));
      return;
    }
  };

  // NOTE: To append country code only on submit, the parent form handler should combine country.code + value.
  // You may want to expose the country code as a prop or callback if needed.

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
        <div className="relative flex items-center">
          <select
            className="mr-2 h-9 rounded border px-2 bg-white text-sm text-gray-600 w-24"
            value={country.code}
            onChange={e => {
              const selected = countryOptions.find(opt => opt.code === e.target.value);
              if (selected) setCountry(selected);
            }}
            style={{ minWidth: 70 }}
          >
            {countryOptions.map(opt => (
              <option key={opt.code} value={opt.code}>
                {opt.flag} {opt.code}
              </option>
            ))}
          </select>
          <Input
            required={rest?.required}
            disabled={rest?.disabled}
            placeholder={rest?.placeholder}
            id={id ?? name}
            onChange={handleOnChange}
            className={cn('pr-8 pl-2')}
            type="tel"
            maxLength={maxCount}
            value={inputValue}
            {...rest}
          />
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

function FormInputMobile<T>({ register, onChange, ...rest }: TProps<T>) {
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

export default FormInputMobile;
