import React, { FC, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import OutlinedInput, {
  OutlinedInputProps
} from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 32,
    width: '100%',
    alignSelf: 'center'
  },
  input: {
    height: 50,
    marginTop: 3
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    color: theme.palette.warning.main
  }
}));

type Props = OutlinedInputProps & {
  helperTextStyle?: string;
};

const TextField: FC<Props> = ({
  className,
  helperTextStyle,
  ...props
}: Props) => {
  const [passwordVisible, isPasswordVisible] = useState(false);
  const { name, placeholder, type } = props;

  const [field, meta] = useField({
    name: name as string,
    placeholder,
    type
  });

  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" className={classes.container}>
        <InputLabel htmlFor={name}>{props.label}</InputLabel>
        <OutlinedInput
          className={`${classes.input} ${className}`}
          {...field}
          {...props}
          {...{
            error: !meta.initialTouched && !!(meta.touched && meta.error),
            type:
              type === 'password-visible'
                ? passwordVisible
                  ? 'text'
                  : 'password'
                : type,
            endAdornment:
              type === 'password-visible' ? (
                <IconButton
                  aria-label="visible"
                  onClick={() => isPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ) : (
                props.endAdornment
              )
          }}
        />
        <FormHelperText className={`${classes.errorText} ${helperTextStyle}`}>
          {!meta.initialTouched && meta.touched && meta.error}
        </FormHelperText>
      </FormControl>
    </>
  );
};

TextField.defaultProps = {
  helperTextStyle: ''
};

export default TextField;
