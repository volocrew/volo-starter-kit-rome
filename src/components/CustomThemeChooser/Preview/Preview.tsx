import React, { FC } from 'react';
import {
  makeStyles,
  Typography,
  useTheme,
  AppBar,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    justifyContent: 'space-beetween',
    flexDirection: 'column',
    color: 'currentColor',
    height: '100%',
    backgroundColor: theme.palette.background.paper
  },
  preHeader: {
    height: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark
  },
  appBar: {
    background: theme.palette.primary.main,
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    fontSize: '1.25rem'
  },
  palette: {
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: 'auto',
    marginLeft: 'auto'
  },
  addButton: {
    borderRadius: '50%',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.light
    }
  }
}));

const Preview: FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const paletteString = `
  {
    palette: {
      type: '${theme.palette.type}',
      primary: {
        main: '${theme.palette.primary.main}',
      },
      secondary: {
        main: '${theme.palette.secondary.main}',
      },
    },
  }
  `;

  return (
    <div className={classes.container}>
      <div className={classes.preHeader} />
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Color
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.palette}>
        <pre>{paletteString}</pre>
      </div>

      <div className={classes.buttonContainer}>
        <IconButton className={classes.addButton}>
          <AddRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Preview;
