import React from 'react';

import clsx from 'clsx';
import { FaCheck, FaTimes } from 'react-icons/fa';

import FormLayout from './components/_FormLayout';
import useFormController from './components/useFormController';
import { TFormFieldProps } from './models';

interface SwitchProps {
  activeLabel?: string;
  inactiveLabel?: string;
  size?: 'sm' | 'md';
  value?: string | boolean;
}

type Props = Omit<TFormFieldProps, keyof SwitchProps> & SwitchProps;

const InputComponent = <T,>({
  activeLabel,
  inactiveLabel,
  size = 'md',

  name,
  label,
  description,
  required,
  error,
  disabled,
  value,
  onChange,
}: Props & {
  value: string | boolean;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}): React.JSX.Element => {
  const handleToggle = (): void => {
    if (disabled) return;
    onChange((prev: any) => ({
      ...prev,
      [name as keyof T]: !value,
    }));
  };

  const isActive = !!value;

  const returnSwitchBySize = () => {
    if (size === 'sm') {
      return (
        <div
          onClick={handleToggle}
          className={clsx(
            'flex h-6 w-11 cursor-pointer items-center rounded-full p-1 transition-colors',
            isActive ? 'bg-success' : 'bg-gray-light',
          )}
        >
          <div
            className={clsx(
              'flex size-4 transform items-center justify-center rounded-full bg-white shadow-md transition-transform',
              isActive ? 'translate-x-5' : 'translate-x-0',
            )}
          >
            {isActive ? (
              <FaCheck className="size-2 text-success" />
            ) : (
              <FaTimes className="size-2 text-gray" />
            )}
          </div>
        </div>
      );
    }
    return (
      <div
        onClick={handleToggle}
        className={clsx(
          'flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors',
          isActive ? 'bg-success' : 'bg-gray-light',
        )}
      >
        <div
          className={clsx(
            'flex size-5 transform items-center justify-center rounded-full bg-white shadow-md transition-transform',
            isActive ? 'translate-x-6' : 'translate-x-1',
          )}
        >
          {isActive ? (
            <FaCheck className="size-3 text-success" />
          ) : (
            <FaTimes className="size-3 text-gray" />
          )}
        </div>
      </div>
    );
  };

  return (
    <FormLayout label={label} description={description} required={required} error={error}>
      <div className="flex flex-row items-center space-x-2">
        {returnSwitchBySize()}
        {(activeLabel || inactiveLabel) && (
          <div>
            {activeLabel && isActive && <span className="text-sm text-success">{activeLabel}</span>}
            {inactiveLabel && !isActive && <span className="text-sm">{inactiveLabel}</span>}
          </div>
        )}
      </div>
    </FormLayout>
  );
};

function FormSwitch(props: Props): React.JSX.Element {
  return useFormController({ Component: InputComponent, props });
}

export default FormSwitch;
