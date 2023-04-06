import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SelectOption } from './Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  }
}));

interface Props {
  options: SelectOption[];
  handleClick: (selected: string) => void;
  containerStyle?: string;
  buttonStyle?: string;
}

const ButtonGroup: FC<Props> = ({
  options,
  handleClick,
  containerStyle,
  buttonStyle
}: Props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${containerStyle}`}>
      {options.map(option => {
        return (
          <Button
            key={option.value}
            className={buttonStyle}
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => handleClick(option.value)}>
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

ButtonGroup.defaultProps = {
  containerStyle: '',
  buttonStyle: ''
};

export default ButtonGroup;
