import React, { FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles
} from '@material-ui/core';
import Button from 'components/common/Button';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: 600,
    margin: 'auto'
  }
}));

type Props = {
  open: boolean;
  children: React.ReactNode;
  dialogTitle: string;
  loading: boolean;
  confirmButtonTitle: string;
  closeButtonTitle: string;
  submit: () => void;
  setOpen: (show: boolean) => void;
};

const ConfirmDialog: FC<Props> = ({
  open,
  dialogTitle,
  children,
  loading,
  confirmButtonTitle,
  closeButtonTitle,
  setOpen,
  submit
}: Props) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog"
      className={classes.container}
      fullWidth
      maxWidth="sm">
      <DialogTitle id="confirm-dialog">{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          disabled={loading}
          onClick={submit}>
          {confirmButtonTitle}
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          {closeButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
