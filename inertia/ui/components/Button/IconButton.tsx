import { ReactNode } from 'react';

import clsx from 'clsx';
import { FaCube } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

import './_button.scss';
import { ButtonType, TColor, TSize, TVariant } from './models';
import { iconButtonSize } from './theme';
import { buildThemeClass } from './utils';

interface Props {
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  onClick: () => void;

  isLoading?: boolean;
  isLoadingRender?: ReactNode;
  icon?: ReactNode;

  size?: TSize;
  color?: TColor;
  variant?: TVariant;
}

export function IconButton({
  type = 'button',
  className = '',
  disabled = false,
  onClick = () => {},

  isLoading = false,
  isLoadingRender = <ImSpinner2 className="animate-spin" />,
  icon = <FaCube />,

  size = 'md',
  color = 'primary',
  variant = 'solid',
  ...rest
}: Props) {
  const themeClass = buildThemeClass(variant, color, disabled, true);
  const sizeClass = iconButtonSize[size];

  return (
    <button
      type={type}
      className={clsx('btn-icon', className, themeClass, sizeClass)}
      onClick={!isLoading && !disabled ? onClick : () => {}}
      disabled={isLoading || disabled}
      {...rest}
    >
      <div className={clsx('flex items-center', isLoading ? 'opacity-0' : '')}>
        {icon}
      </div>
      <div className="absolute flex items-center justify-center">
        {isLoading && isLoadingRender}
      </div>
    </button>
  );
}

export default IconButton;
