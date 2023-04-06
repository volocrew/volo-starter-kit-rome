import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { MenuType } from 'models/nav';
import ToolBarItem from 'components/common/ToolBarItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarItem: {
      cursor: 'pointer'
    },
    body: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4)
    }
  })
);

const topMenus: MenuType[] = [
  {
    itemKey: 0,
    title: 'Settings',
    icon: 'cog',
    link: '/control-board/settings'
  }
];

const ControlBoardOptionsBar: FC = () => {
  const classes = useStyles();
  const [activeOption, setActiveOption] = useState('Lists');
  const history = useHistory();

  return (
    <Toolbar>
      {topMenus.map((menu: MenuType, index) => (
        <ToolBarItem
          key={menu.itemKey.toString()}
          item={{
            ...menu,
            isActive: menu.title === activeOption,
            onClick: () => {
              setActiveOption(menu.title);
              if (menu.link) {
                history.push(menu.link);
              }
            }
          }}
        />
      ))}
    </Toolbar>
  );
};

export default ControlBoardOptionsBar;
