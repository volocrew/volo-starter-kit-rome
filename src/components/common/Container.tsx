import React, { FC } from 'react';
import {
  Container,
  ContainerProps,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3),
    width: '100%',
    height: '100%',
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    fontFamily: 'RobotoLight',
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary
  }
}));

type Props = ContainerProps & {
  title?: string;
};

const MyContainer: FC<Props> = ({
  title,
  children,
  className,
  ...props
}: Props) => {
  const classes = useStyles();

  return (
    <Container {...props} className={`${classes.container} ${className}`}>
      {title && <Typography className={classes.title}>{title}</Typography>}
      {children}
    </Container>
  );
};

MyContainer.defaultProps = {
  title: ''
};

export default MyContainer;
