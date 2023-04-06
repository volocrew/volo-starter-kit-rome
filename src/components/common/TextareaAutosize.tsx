import React, { FC, forwardRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TextareaAutosize, TextareaAutosizeProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(3),
    width: '100%'
  },
  errorText: {
    color: theme.palette.warning.main
  },
  statusText: {
    color: theme.palette.text.primary,
    textAlign: 'right',
    marginTop: -28
  }
}));

type Props = TextareaAutosizeProps & {
  containerStyle?: string;
  textareaStyle?: string;
};

const MyTextareaAutosize: FC<Props> = forwardRef(
  ({ containerStyle, textareaStyle, ...props }: Props, ref) => {
    const { name } = props;

    const [field, meta] = useField({
      name: name as string
    });

    const classes = useStyles();

    return (
      <FormControl variant="outlined" className={`${classes.container}`}>
        <div className={containerStyle}>
          <TextareaAutosize
            ref={ref}
            className={`${textareaStyle}`}
            {...field}
            {...props}
          />
        </div>
        <FormHelperText className={classes.errorText}>
          {!meta.initialTouched && meta.touched && meta.error}
        </FormHelperText>
        {props.maxLength && (
          <FormHelperText className={classes.statusText}>
            {`${field.value?.length ?? 0} / ${props.maxLength}`}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

MyTextareaAutosize.defaultProps = {
  containerStyle: '',
  textareaStyle: ''
};

export default MyTextareaAutosize;
