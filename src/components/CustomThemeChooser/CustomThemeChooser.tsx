import React, { FC, useState } from 'react';
import {
  Button,
  createMuiTheme,
  makeStyles,
  PaletteType,
  ThemeProvider,
  Typography,
  useTheme
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorPicker from './ColorPicker';
import Preview from './Preview';

const createDynamicMuiTheme = (
  type: PaletteType,
  primary: string,
  secondary: string
) =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      }
    }
  });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toggleButton: {
    fontWeight: 500,
    fontSize: 16,
    textTransform: 'none'
  },
  gridContainer: {
    width: '100%',
    background: theme.palette.background.default,
    margin: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  title: {
    fontSize: 28,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  buttonGroup: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 20
  },
  button: {
    borderRadius: theme.spacing(1),
    minWidth: 150,
    fontWeight: 500,
    fontSize: 16,
    textTransform: 'uppercase',
    marginRight: theme.spacing(2)
  }
}));

type Props = {
  title: string;
  onSetAppColors: (palette: PaletteOptions) => void;
  onResetAppColors: () => void;
  onToggleTheme: () => void;
};

const CustomThemeChooser: FC<Props> = ({
  title,
  onSetAppColors,
  onResetAppColors,
  onToggleTheme
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [primaryColor, setPrimaryColor] = useState(theme.palette.primary.main);
  const [secondaryColor, setSecondaryColor] = useState(
    theme.palette.secondary.main
  );

  const handlePrimaryChange = (color: string) => {
    setPrimaryColor(color);
  };

  const handleSecondaryChange = (color: string) => {
    setSecondaryColor(color);
  };

  const handleSetAppColors = () => {
    const palette: PaletteOptions = {
      primary: {
        main: primaryColor
      },
      secondary: {
        main: secondaryColor
      }
    };
    onSetAppColors(palette);
  };

  return (
    <ThemeProvider
      theme={createDynamicMuiTheme(
        theme.palette.type,
        primaryColor,
        secondaryColor
      )}>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>{title}</Typography>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            className={classes.toggleButton}
            startIcon={
              <FontAwesomeIcon
                icon={['fas', 'sun']}
                style={{ width: 20, height: 20 }}
              />
            }
            onClick={onToggleTheme}>
            Toggle light/dark theme
          </Button>
        </div>

        <Grid container spacing={5} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.paper}>
              <ColorPicker
                paletteName="primary"
                initColor={primaryColor}
                colorChange={handlePrimaryChange}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.paper}>
              <ColorPicker
                paletteName="secondary"
                initColor={secondaryColor}
                colorChange={handleSecondaryChange}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.paper}>
              <Preview />
            </div>
          </Grid>
        </Grid>

        <div className={classes.buttonGroup}>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={handleSetAppColors}
            className={classes.button}>
            Set App Colors
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={onResetAppColors}
            className={classes.button}>
            Reset App Colors
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CustomThemeChooser;
