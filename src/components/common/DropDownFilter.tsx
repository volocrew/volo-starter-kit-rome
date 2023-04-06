import React, { FC, useState } from 'react';
import { Select, MenuItem, makeStyles, SelectProps } from '@material-ui/core';
import { SelectOption } from './Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
}));

type Props = SelectProps & {
  options: SelectOption[];
  [key: string]: any;
};

const DropDownFilter: FC<Props> = ({
  onFilterChanged,
  columnDef,
  options
}: Props) => {
  const [selectedVal, setSelectedVal] = useState('');
  const classes = useStyles();

  function handleChange(e: any) {
    const val = e.target.value;
    setSelectedVal(val);
    onFilterChanged(columnDef.tableData.id, val);
  }

  return (
    <div className={classes.container}>
      <Select value={selectedVal} onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i.toString()} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DropDownFilter;
