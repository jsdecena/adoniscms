import React from 'react';

import Select, { SingleValue } from 'react-select';

import FormLayout from './components/_FormLayout';
import useFormController from './components/useFormController';
import { TFormFieldProps } from './models';

export interface FormSelectOption {
  label: string;
  value: string;
}

interface Props extends TFormFieldProps {
  options: FormSelectOption[];
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
  options,
  ...props
}: Props & {
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}): React.JSX.Element => {
  const selectRef = React.useRef(null);

  const handleOnChange = (e: SingleValue<FormSelectOption>): void => {
    const v = e?.value ?? '';
    onChange(v);
  };

  const newValue = options.find((item) => item.value === value) ?? undefined;

  return (
    <FormLayout label={label} description={description} required={required} error={error}>
      <Select
        className="form-input-select"
        classNamePrefix="react-select"
        isDisabled={disabled}
        onChange={handleOnChange}
        id={name}
        name={name}
        options={options}
        placeholder={placeholder || '- Select -'}
        ref={selectRef}
        value={newValue}
        {...props}
      />
    </FormLayout>
  );
};

function FormSelect(props: Props): React.JSX.Element {
  return useFormController({ Component: InputComponent, props });
}

export default FormSelect;
