import { FieldValues } from 'react-hook-form';

export interface TFormFieldProps<T = string> {
  register?: FieldValues | false;
  name?: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<T>> | React.Dispatch<React.SetStateAction<any>>;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string | boolean;
  description?: string;
}
