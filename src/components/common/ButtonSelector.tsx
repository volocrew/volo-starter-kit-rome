import React, { FC, useEffect, useState } from 'react';
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
  onSelect: (selected: string) => void;
  containerStyle?: string;
  buttonStyle?: string;
  noSelected?: boolean;
}

const ButtonSelector: FC<Props> = ({
  options,
  containerStyle,
  buttonStyle,
  noSelected,
  onSelect
}: Props) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    setActiveButton(options[0].value);
  }, []);

  const handleClick = (value: string) => {
    setActiveButton(value);
    onSelect(value);
  };

  return (
    <div className={`${classes.container} ${containerStyle}`}>
      {options.map(option => {
        return (
          <Button
            key={option.value}
            className={buttonStyle}
            variant={
              !noSelected && activeButton === option.value
                ? 'contained'
                : 'outlined'
            }
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

ButtonSelector.defaultProps = {
  containerStyle: '',
  buttonStyle: '',
  noSelected: false
};

export default ButtonSelector;
