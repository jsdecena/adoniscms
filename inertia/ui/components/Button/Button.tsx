'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';
import { ImSpinner2 } from 'react-icons/im';

import './_button.scss';
import { ButtonType, TColor, TSize, TVariant } from './models';
import { buttonSize } from './theme';
import { buildThemeClass } from './utils';

interface Props {
  children: ReactNode;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;

  isLoading?: boolean;
  isLoadingRender?: ReactNode;

  leftItem?: ReactNode;
  rightItem?: ReactNode;

  size?: TSize;
  color?: TColor;
  variant?: TVariant;
}

export function Button({
  children,
  type = 'button',
  className = '',
  disabled = false,
  onClick = () => {},

  isLoading = false,
  isLoadingRender = <ImSpinner2 className="animate-spin" />,

  leftItem = null,
  rightItem = null,

  size = 'md',
  color = 'primary',
  variant = 'solid',

  ...rest
}: Props) {
  const themeClass = buildThemeClass(variant, color, disabled, false);
  const sizeClass = buttonSize[size];

  return (
    <button
      type={type}
      className={clsx('btn', className, themeClass, sizeClass)}
      onClick={!isLoading && !disabled ? onClick : () => {}}
      disabled={isLoading || disabled}
      {...rest}
    >
      <div className={clsx('btn-body', isLoading ? 'is-loading' : '')}>
        {leftItem && <span className="btn-left">{leftItem}</span>}
        {children}
        {rightItem && <span className="btn-right">{rightItem}</span>}
      </div>
      {isLoading && <div className="btn-loading-body">{isLoadingRender}</div>}
    </button>
  );
}

export default Button;
