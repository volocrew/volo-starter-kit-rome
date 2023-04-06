import { makeStyles, useTheme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CustomThemeChooser from 'components/CustomThemeChooser';
import { updateUser as updateUserAction } from 'redux/actions/user';
import { saveRedirectUrl } from 'redux/actions/auth';
import { ThemeType, UserInput } from 'models/user';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 30,
    marginLeft: theme.spacing(3),
    background: theme.palette.background.paper,
    height: 'calc(100vh - 60px)',
    borderRadius: 6
  }
}));

const Preferences: FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const updateUser = useCallback(
    (user: UserInput) => {
      dispatch(saveRedirectUrl());
      dispatch(updateUserAction(user));
    },
    [dispatch]
  );

  const handleToggleTheme = () => {
    updateUser({
      theme: theme.palette.type === 'dark' ? ThemeType.Light : ThemeType.Dark
    });
  };

  const handleSetAppColors = (palette: PaletteOptions) => {
    const input: UserInput = {
      palette
    };
    updateUser(input);
  };

  const handleResetAppColors = () => {
    const input: UserInput = {
      palette: {}
    };
    updateUser(input);
  };

  return (
    <div className={classes.container}>
      <CustomThemeChooser
        title="Volo Starter Kit Theme Playground"
        onSetAppColors={handleSetAppColors}
        onResetAppColors={handleResetAppColors}
        onToggleTheme={handleToggleTheme}
      />
    </div>
  );
};

export default Preferences;
