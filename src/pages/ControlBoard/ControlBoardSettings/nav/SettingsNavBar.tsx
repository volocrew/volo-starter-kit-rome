import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuType } from 'models/nav';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { navItems } from './menu';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    },
    menuList: {
      marginLeft: 12,
      marginRight: 14,
      padding: 0,
      flexGrow: 1
    },
    listItemActive: {
      background: 'rgba(229, 228, 228, 0.5)'
    },
    listItemText: {
      '& span': {
        fontSize: 20,
        color: theme.palette.text.primary
      }
    },
    listItemTextSmall: {
      '& span': {
        fontSize: 18,
        color: theme.palette.text.primary
      }
    },
    listItemActiveText: {
      '& span': {
        color: theme.palette.text.primary
      }
    },
    divider: {
      marginTop: 8,
      marginBottom: 8,
      marginLeft: -12,
      marginRight: -14
    },
    submenuList: {
      marginLeft: 10
    },
    openedMenu: {
      borderRadius: 6,
      marginBottom: 4,
      background: theme.palette.primary.dark,

      '&:hover': {
        background: theme.palette.primary.main
      }
    },
    closedMenu: {
      background: 'rgba(186, 186, 186, 0.5)',
      borderRadius: 6,
      marginBottom: 4
    },
    listItemOpenedText: {
      '& span': {
        fontSize: 20,
        fontFamily: 'RobotoMedium',
        color: '#FFF'
      }
    },
    listItemClosedText: {
      '& span': {
        fontSize: 20,
        fontFamily: 'RobotoLight',
        color: theme.palette.primary.dark
      }
    },
    collapse: {
      '&.MuiCollapse-container': {
        background: theme.palette.background.paper
      }
    }
  })
);

const SettingsNavBar: FC = () => {
  const classes = useStyles();

  return (
    <>
      <List className={classes.menuList}>
        {navItems.map((item, key) => {
          return item.type === 'divider' ? (
            <Divider
              className={classes.divider}
              key={item.itemKey.toString()}
            />
          ) : (
            <MenuItem item={item} key={item.itemKey.toString()} />
          );
        })}
      </List>
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

  const { title, icon, size, link, disabled, onClick } = item;
  const isActive = item.link === location.pathname;

  return (
    <ListItem
      component={Link}
      to={link || ' '}
      button
      key={title}
      onClick={() => onClick && onClick()}
      disabled={disabled || false}
      className={isActive ? classes.listItemActive : ''}>
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
  const { items: children, icon, title, size } = item;
  const [open, setOpen] = useState(!!item.isActive);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        className={open ? classes.openedMenu : classes.closedMenu}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={title}
          className={`${
            size === 'small' ? classes.listItemTextSmall : classes.listItemText
          } ${open ? classes.listItemOpenedText : classes.listItemClosedText}`}
        />
        {open ? (
          <FontAwesomeIcon icon={['fas', 'chevron-up']} color="#FFF" />
        ) : (
          <FontAwesomeIcon icon={['fas', 'chevron-down']} color="#1361AA" />
        )}
      </ListItem>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}>
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

export default SettingsNavBar;
