export type ButtonType = 'button' | 'submit';

export type TSize = 'sm' | 'md' | 'lg' | 'xl';

export type TColor =
  | 'white'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'danger'
  | 'success'
  | 'warning'
  | 'gray';

export type TVariant = 'solid' | 'outline' | 'text';

export interface ThemeType {
  disabled: string;
  white: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  danger: string;
  gray: string;
}
