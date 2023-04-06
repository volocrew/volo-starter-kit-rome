import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import {
  createStyles,
  Theme,
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Collapse, IconButton, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { logout as logoutAction, saveRedirectUrl } from 'redux/actions/auth';
import { updateUser as updateUserAction } from 'redux/actions/user';
import { getInitials } from 'utils/common';
import { RootState } from 'redux/store';
import { selectUser } from 'redux/selectors/user';
import LogoDark from 'static/images/volo_logo-dark.png';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { MenuType } from 'models/nav';
import { ThemeType, UserInput } from 'models/user';
import MainRoutes from 'MainRoutes';
import { navItems } from './menu';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navIcon: {
      position: 'fixed',
      marginLeft: theme.spacing(1),
      bottom: 0,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    navIconShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      background: theme.palette.primary.dark
    },
    drawerFooter: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: 0
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: {
      height: 32
    },
    userMenu: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing(1)
    },
    menuList: {
      marginLeft: 12,
      marginRight: 14,
      flexGrow: 1
    },
    navHeader: {
      fontFamily: 'RobotoBold',
      fontSize: 18,
      color: '#FFF',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    listItem: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    listItemActive: {
      background: '#F6F6F6',
      borderRadius: 6,
      '&:hover': {
        background: '#FFF'
      }
    },
    listItemText: {
      '& span': {
        fontFamily: 'RobotoMedium',
        fontSize: 18,
        color: '#FFF'
      }
    },
    menuTitle: {
      '& span': {
        fontSize: 20,
        // fontWeight: 600,
        fontFamily: 'RobotoMedium',
        color: '#FFF'
      }
    },
    listItemTextSmall: {
      '& span': {
        fontSize: 18,
        color: '#FFF'
      }
    },
    listItemActiveText: {
      '& span': {
        fontSize: 18,
        color: theme.palette.primary.main
      }
    },
    divider: {
      background: '#ffffff44',
      marginTop: 8,
      marginBottom: 8,
      width: '90%',
      marginLeft: 3,
      height: 2
    },
    dividerFirst: {
      background: '#ffffff44',
      marginTop: 8,
      marginBottom: 8,
      width: '83%',
      marginLeft: 16,
      height: 2
    },
    submenuList: {
      marginLeft: 10
    },
    avatar: {
      width: 40,
      height: 40,
      marginTop: 7,
      marginBottom: 7,
      background: theme.palette.secondary.main,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& p': {
        color: '#EFEFEF',
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    logo: {
      width: '100%',
      paddingLeft: 22,
      paddingRight: 60,
      marginBottom: 40
    },
    chevron: {
      color: '#FFF',
      fontSize: 20
    },
    chevronCircle: {
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
      fontSize: 30
    }
  })
);

const SideNavBar: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);
  const user = useSelector((state: RootState) => selectUser(state));
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const setTheme = useCallback(
    (input: UserInput) => {
      dispatch(saveRedirectUrl());
      dispatch(updateUserAction(input));
    },
    [dispatch]
  );

  const toggleTheme = () => {
    setTheme({
      theme: user?.theme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark
    });
  };

  const renderUser = () => {
    return (
      <>
        <img src={LogoDark} alt="VoloLogo" className={classes.logo} />
        <div className={classes.userMenu}>
          <div className={classes.menuList}>
            <MultiMenu
              item={{
                itemKey: 0,
                title: user?.name ?? '',
                name: 'username',
                icon: (
                  <div className={classes.avatar}>
                    <Typography>{getInitials(user?.name ?? '')}</Typography>
                  </div>
                ),
                items: [
                  {
                    itemKey: 0,
                    title: 'Log Out',
                    name: 'logOut',
                    icon: 'sign-out-alt',
                    onClick: () => logout()
                  },
                  {
                    itemKey: 1,
                    title: 'Light/Dark Theme',
                    name: 'toggleTheme',
                    icon: 'sun',
                    onClick: () => toggleTheme()
                  }
                ]
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        open={open}>
        <div className={classes.toolbar} />

        {renderUser()}

        <Divider className={classes.dividerFirst} />
        <List className={classes.menuList}>
          {navItems.map((item, key) => {
            return item.type === 'divider' ? (
              <Divider
                className={classes.divider}
                key={item.itemKey.toString()}
              />
            ) : item.type === 'text' ? (
              <Typography
                className={classes.navHeader}
                key={item.itemKey.toString()}>
                {item.title}
              </Typography>
            ) : (
              <MenuItem item={item} key={item.itemKey.toString()} />
            );
          })}
        </List>
        <Divider />

        <div className={classes.drawerFooter}>
          <IconButton onClick={handleDrawerClose}>
            <FontAwesomeIcon
              icon={['fas', 'chevron-left']}
              className={classes.chevron}
            />
          </IconButton>
        </div>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}>
        <MainRoutes />
      </main>
      <div
        className={clsx(classes.navIcon, {
          [classes.navIconShift]: open
        })}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}>
          <FontAwesomeIcon
            icon={['fas', 'chevron-circle-right']}
            className={classes.chevronCircle}
          />
        </IconButton>
      </div>
    </>
  );
};

const MenuItem = ({ item }: { item: MenuType }) => {
  const Component = item?.items?.length ? MultiMenu : SingleMenu;

  return <Component item={item} />;
};

const SingleMenu = ({ item }: { item: MenuType }) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const { title, icon, size, link, name, onClick } = item;

  const isActive = location.pathname.includes(item.link || 'NULL');

  return (
    <ListItem
      component={Link}
      to={link || ' '}
      button
      key={title}
      data-cy={`cy-menu-${name}`}
      onClick={() => onClick && onClick()}
      className={isActive ? classes.listItemActive : classes.listItem}>
      {icon && (
        <ListItemIcon>
          {typeof icon === 'string' ? (
            <FontAwesomeIcon
              icon={['fas', icon as IconName]}
              style={{ width: 25, height: 25 }}
              color={isActive ? theme.palette.primary.main : '#FFF'}
            />
          ) : (
            icon
          )}
        </ListItemIcon>
      )}
      <ListItemText
        primary={title}
        className={`${
          size === 'small' ? classes.listItemTextSmall : classes.listItemText
        } ${isActive ? classes.listItemActiveText : ''}`}
      />
    </ListItem>
  );
};

const MultiMenu = ({ item }: { item: MenuType }) => {
  const classes = useStyles();
  const { items: children, icon, title, name, size } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <ListItem button onClick={handleClick} data-cy={`cy-menu-${name}`}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} className={classes.menuTitle} />
        {open ? (
          <FontAwesomeIcon
            icon={['fas', 'chevron-up']}
            className={classes.chevron}
          />
        ) : (
          <FontAwesomeIcon
            icon={['fas', 'chevron-down']}
            className={classes.chevron}
          />
        )}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.submenuList}>
          {children &&
            children.map((child, key) => (
              <MenuItem
                key={item.itemKey.toString()}
                item={{ ...child, size: 'small' }}
              />
            ))}
        </List>
      </Collapse>
    </>
  );
};

export default SideNavBar;
