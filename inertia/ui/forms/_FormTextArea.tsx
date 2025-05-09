import React from 'react';

import clsx from 'clsx';

import './_form-input.scss';
import FormLayout from './components/_FormLayout';
import useFormController from './components/useFormController';
import { TFormFieldProps } from './models';

type BaseProps = TFormFieldProps &
  Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, keyof TFormFieldProps>;

interface Props extends BaseProps {
  rows?: number;
}

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
  rows = 8,
  ...props
}: Props & {
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}): React.JSX.Element => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const v = e.target.value;
    onChange((prev: T) => ({
      ...prev,
      [name as keyof T]: v,
    }));
  };

  return (
    <FormLayout label={label} description={description} required={required} error={error}>
      <textarea
        onChange={handleOnChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        value={value ?? ''}
        className={clsx('form-input', 'w-full py-2 px-4 border border-gray-200 rounded-md')}
        rows={rows}
        style={{ resize: 'none' }}
        {...props}
      />
    </FormLayout>
  );
};

function FormTextArea(props: Props): React.ReactElement {
  return useFormController({ Component: InputComponent, props });
}

export default FormTextArea;
