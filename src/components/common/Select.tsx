import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormHelperText,
  MenuItem,
  Select,
  SelectProps
} from '@material-ui/core';
import { useField } from 'formik';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    width: '100%'
  },
  errorText: {
    color: theme.palette.warning.main
  }
}));

export type SelectOption = {
  value: string;
  label: string;
};

type Props = SelectProps & {
  options: SelectOption[];
  noNone?: boolean;
  containerStyle?: string;
};

const MySelect: FC<Props> = ({
  id,
  options,
  name,
  noNone,
  containerStyle,
  ...props
}: Props) => {
  const classes = useStyles();

  const [field, meta] = useField({
    name: name as string
  });

  return (
    <div className={`${classes.container} ${containerStyle}`}>
      <Select id={id} {...field} {...props}>
        {!noNone && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {options.map((option, i) => (
          <MenuItem key={i.toString()} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={classes.errorText}>
        {!meta.initialTouched && meta.touched && meta.error}
      </FormHelperText>
    </div>
  );
};

MySelect.defaultProps = {
  containerStyle: '',
  noNone: false
};

export default MySelect;
