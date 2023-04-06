import React, { FC, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { selectUser } from 'redux/selectors/user';
import { RootState } from 'redux/store';
import { ThemeType } from 'models/user';
import themeCreator from './themes/base';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

// eslint-disable-next-line react/require-default-props
const ThemeProvider: FC = ({ children }: { children?: ReactNode }) => {
  const user = useSelector((state: RootState) => selectUser(state));
  // Read current theme from localStorage or maybe from an api
  const curThemeName = user?.theme === ThemeType.Dark ? 'dark' : 'light';

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(curThemeName);

  // Get the theme object by theme name
  const theme = themeCreator(curThemeName, user?.palette);

  const setThemeName = (newThemeName: string): void => {
    localStorage.setItem('appTheme', newThemeName);
    _setThemeName(newThemeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
