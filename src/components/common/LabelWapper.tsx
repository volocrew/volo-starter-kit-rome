import React, { FC, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    minWidth: 140,
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : '#FFFFFF !important'
  }
}));

export type InputRef = HTMLInputElement;

interface Props {
  label: string;
  control: ReactNode;
  containerStyle?: string;
  labelStyle?: string;
}

const LabelWapper: FC<Props> = ({
  label,
  labelStyle,
  containerStyle,
  control
}: Props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${containerStyle}`}>
      <Typography className={`${classes.label} ${labelStyle}`}>
        {label}
      </Typography>
      {control}
    </div>
  );
};

LabelWapper.defaultProps = {
  containerStyle: '',
  labelStyle: ''
};

export default LabelWapper;
