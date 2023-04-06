import React, { FC } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%'
  }
});

type Props = {
  loading?: boolean;
};

const Spinner: FC<Props> = ({ loading }) => {
  const classes = useStyles();
  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return <></>;
};

Spinner.propTypes = {
  loading: PropTypes.bool
};

Spinner.defaultProps = {
  loading: false
};

export default Spinner;
