import React, { useState } from 'react';

import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import IconButton from '../components/Button/IconButton';
import './_form-input.scss';
import FormLayout from './components/_FormLayout';
import useFormController from './components/useFormController';
import { TFormFieldProps } from './models';

type BaseProps = TFormFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof TFormFieldProps>;

interface Props extends BaseProps {}

const InputComponent = <T,>({
  name,
  label,
  description,
  required,
  error,
  disabled,
  placeholder,
  value,
  onChange,
  ...props
}: Props & {
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const isOnChange = typeof onChange === 'function';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value;
    if (isOnChange) {
      onChange((prev: T) => ({
        ...prev,
        [name as keyof T]: v,
      }));
    }
  };

  const handleToggle = () => {
    setShowPassword((currState) => !currState);
  };

  return (
    <FormLayout label={label} description={description} required={required} error={error}>
      <div className="flex items-center mb-1">
        {label && (
          <label htmlFor={name} className="font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>
      <div className="relative flex w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={handleOnChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          value={value}
          className={clsx('form-input pr-10')}
          {...props}
        />
        <IconButton
          color="gray"
          variant="text"
          onClick={handleToggle}
          className="absolute right-0 self-center rounded-full p-0"
          size="lg"
          icon={showPassword ? <FaEye /> : <FaEyeSlash />}
        />
      </div>
    </FormLayout>
  );
};

function FormInputPassword(props: Props): React.JSX.Element {
  return useFormController({ Component: InputComponent, props });
}

export default FormInputPassword;
