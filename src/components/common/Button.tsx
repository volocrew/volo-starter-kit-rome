import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonProps } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: 25,
    minWidth: 150,
    height: 50,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    textTransform: 'uppercase'
  }
}));

const MyButton: FC<ButtonProps> = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = useStyles();
  return (
    <Button {...props} className={`${classes.button} ${className}`}>
      {children}
    </Button>
  );
};

export default MyButton;
