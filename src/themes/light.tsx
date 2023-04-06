import { createMuiTheme, Theme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const orignalPalette: PaletteOptions = {
  type: 'light',
  primary: {
    dark: '#1B1E38', // primary volo blue
    main: '#6DAEDB' // tertiary blue
  },
  secondary: {
    main: '#F77F00' // secondary orange
  },
  background: {
    default: '#F6F6F6',
    paper: '#FFFFFF'
  },
  warning: {
    main: '#DD2F08' // updated red color
  },
  text: {
    primary: '#495156'
  }
};

const lightTheme = (palette: PaletteOptions | undefined): Theme => {
  const theme = createMuiTheme({
    palette: palette ? { ...orignalPalette, ...palette } : orignalPalette,
    typography: {
      fontFamily: ['RobotoRegular'].join(','),
      button: {
        textTransform: 'none'
      }
    }
  });

  theme.overrides = {
    MuiDialogContent: {
      root: {
        background: theme.palette.background.default
      }
    },
    MuiDialogTitle: {
      root: {
        background: theme.palette.background.default,

        '& h2': {
          fontFamily: 'RobotoMedium',
          fontSize: 32,
          color: theme.palette.primary.dark
        }
      }
    },
    MuiInputBase: {
      root: {
        border: '0px'
      }
    },
    MuiDialogActions: {
      root: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(4.5),
        paddingLeft: theme.spacing(3),
        background: theme.palette.background.default,

        '& button': {
          marginRight: theme.spacing(1)
        }
      }
    },
    MuiButton: {
      root: {
        '&.MuiButton-containedPrimary': {
          color: 'white'
        },
        '&.MuiButton-containedSecondary': {
          color: 'white'
        }
      }
    },
    MuiSelect: {
      root: {
        height: 50
      },
      icon: {
        position: 'relative',
        marginLeft: '-22px'
      }
    }
  };

  return theme;
};

export default lightTheme;
