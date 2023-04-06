import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export enum ThemeType {
  Light = 'Light',
  Dark = 'Dark'
}

export type User = {
  createdAt: string;
  email: string;
  name: string;
  theme?: ThemeType;
  palette?: PaletteOptions;
  notifications?: string;
};

export type UserInput = {
  theme?: ThemeType;
  palette?: PaletteOptions;
};
