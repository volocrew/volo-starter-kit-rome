import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnderConstructionAnim from 'static/images/under-construction.gif';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  image: {
    width: '100%',
    borderRadius: 9
  }
});

const UnderConstruction: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img
        src={UnderConstructionAnim}
        alt="under-construction"
        className={classes.image}
      />
    </div>
  );
};

export default UnderConstruction;
