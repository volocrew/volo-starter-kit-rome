import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { MenuType } from 'models/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  card: {
    width: 150,
    height: 150,
    border: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    cursor: 'pointer',

    '&:hover': {
      background: theme.palette.type === 'light' ? '#BABABA' : '#424242',
      color: '#FFF'
    }
  },
  cardActive: {
    background: theme.palette.primary.main,

    '&:hover': {
      background: theme.palette.primary.dark
    }
  },
  cardContent: {
    padding: 0,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&:last-child': {
      paddingBottom: 0
    }
  },
  typography: {
    fontSize: 24,
    fontFamily: 'RobotoLight',
    marginTop: theme.spacing(2),
    color: '#CCCCCC'
  },
  typographyActive: {
    fontFamily: 'RobotoMedium'
  }
}));

type Props = {
  item: MenuType;
};

const ToolBarItem: FC<Props> = ({ item }: Props) => {
  const classes = useStyles();

  const { title, icon, isActive, onClick } = item;

  return (
    <Card
      variant="outlined"
      className={
        isActive ? `${classes.card} ${classes.cardActive}` : classes.card
      }
      onClick={onClick}>
      <CardContent className={classes.cardContent}>
        {typeof icon === 'string' ? (
          <FontAwesomeIcon
            icon={['fas', icon as IconName]}
            style={{ width: 50, height: 50 }}
            color={isActive ? 'white' : '#CCCCCC'}
          />
        ) : (
          icon
        )}
        <Typography
          variant="body1"
          className={
            isActive
              ? `${classes.typography} ${classes.typographyActive}`
              : classes.typography
          }>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ToolBarItem;
