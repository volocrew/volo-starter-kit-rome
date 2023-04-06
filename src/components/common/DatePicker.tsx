import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps
} from '@material-ui/pickers';
import { FormHelperText, makeStyles } from '@material-ui/core';

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

type Props = Omit<KeyboardDatePickerProps, 'onChange' | 'value'>;

const DatePickerField: FC<Props> = ({ ...props }: Props) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const { name } = props;

  const [field, meta] = useField({
    name: name as string
  });

  return (
    <div className={classes.container}>
      <KeyboardDatePicker
        {...field}
        {...props}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        value={field.value}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <FormHelperText className={classes.errorText}>
        {!meta.initialTouched && meta.touched && meta.error}
      </FormHelperText>
    </div>
  );
};

export default DatePickerField;
