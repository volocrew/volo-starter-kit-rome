import { Theme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import lightTheme from './light';
import darkTheme from './dark';

export default function themeCreator(
  theme: string,
  palette: PaletteOptions | undefined
): Theme {
  if (theme === 'light') {
    return lightTheme(palette);
  }

  return darkTheme(palette);
}
