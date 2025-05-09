import { type TColor, type ThemeType, type TVariant } from './models';
import { iconTextTheme, outlineTheme, solidTheme, textTheme } from './theme';

export const buildThemeClass = (
  variant: TVariant,
  color: TColor,
  disabled: boolean,
  isIcon: boolean
): string => {
  let theme: ThemeType | null = null;
  if (variant === 'solid') theme = solidTheme;
  if (variant === 'outline') theme = outlineTheme;
  if (variant === 'text') theme = isIcon ? iconTextTheme : textTheme;

  if (theme) {
    if (disabled) return theme.disabled;
    if (color === 'white') return theme.white;
    if (color === 'primary') return theme.primary;
    if (color === 'secondary') return theme.secondary;
    if (color === 'info') return theme.info;
    if (color === 'success') return theme.success;
    if (color === 'warning') return theme.warning;
    if (color === 'danger') return theme.danger;
    if (color === 'gray') return theme.gray;
  }
  return '';
};
