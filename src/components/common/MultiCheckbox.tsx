import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { SelectOption } from './Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(1)
    }
  })
);

type Props = {
  items: SelectOption[];
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const MultiCheckbox: FC<Props> = ({
  items,
  checkedItems,
  setCheckedItems
}: Props) => {
  const classes = useStyles();

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked && !checkedItems.includes(name)) {
      setCheckedItems([...checkedItems, name]);
    } else if (!checked) {
      const index = checkedItems.indexOf(name);
      if (index !== -1) {
        checkedItems.splice(index, 1);
      }
      setCheckedItems([...checkedItems]);
    }
  };

  return (
    <div className={classes.container}>
      {items.map((item, index) => (
        <FormControlLabel
          key={index.toString()}
          control={
            <Checkbox
              color="primary"
              name={item.value}
              checked={checkedItems.indexOf(item.value) > -1}
              onChange={handleCheck}
            />
          }
          label={item.label}
        />
      ))}
    </div>
  );
};

export default MultiCheckbox;
