import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import { createStyles, FormGroup, makeStyles, Theme } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import LoadingOverlay from 'react-loading-overlay-ts';
import Container from 'components/common/Container';
import LabelWapper from 'components/common/LabelWapper';
import ButtonGroup from 'components/common/ButtonGroup';
import { SelectOption } from 'components/common/Select';
import TextareaAutosize from 'components/common/TextareaAutosize';
import Button from 'components/common/Button';
import { selectPushEmailSetting } from 'redux/selectors/application';
import { updateApplicationSetting as updateApplicationSettingAction } from 'redux/actions/application';
import { RootState } from 'redux/store';
import { ApplicationSetting, PlaceholderType } from 'models/application';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(3)
    },
    groupButton: {
      minWidth: '20%',
      border: '1px solid rgba(186, 186, 186, 0.5)',
      boxSizing: 'border-box',
      borderRadius: 129.1,
      marginRight: theme.spacing(1)
    },
    group: {
      justifyContent: 'flex-start'
    },
    mb2: {
      marginBottom: theme.spacing(2)
    },
    labelWrapper: {
      alignItems: 'flex-start'
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.palette.text.primary,
      width: 210,
      marginRight: theme.spacing(4)
    },
    contentContainer: {
      border: '2px solid rgba(186, 186, 186, 0.5)',
      boxSizing: 'border-box',
      borderRadius: 6,
      paddingTop: 15,
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: 21,
      width: '100%'
    },
    contentInput: {
      fontFamily: 'RobotoRegular',
      width: '100%',
      border: 'none',
      outline: 'none',
      fontSize: 14,
      lineHeight: '16px',
      color: theme.palette.text.primary,
      background: theme.palette.background.paper
    },
    chipContainer: {
      marginBottom: theme.spacing(3)
    },
    emailBody: {
      height: 300
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    saveButton: {
      width: 190,
      marginTop: theme.spacing(-9),
      marginLeft: -280
    }
  })
);

const Schema = Yup.object().shape({
  emailSubject: Yup.string().required('Required *'),
  emailBody: Yup.string().required('Required *')
});

export type ChipOption = {
  key: string;
  label: string;
};

const placeholders: SelectOption[] = [
  { value: PlaceholderType.TodayDate, label: PlaceholderType.TodayDate },
  { value: PlaceholderType.TodayTime, label: PlaceholderType.TodayTime },
  {
    value: PlaceholderType.Items,
    label: PlaceholderType.Items
  }
];

const PushEmailSettings = () => {
  const classes = useStyles();
  const pushEmailSetting = useSelector((state: RootState) =>
    selectPushEmailSetting(state)
  );
  const loading = useSelector((state: RootState) => state.application.loading);

  const [recipients, setRecipients] = React.useState<string[]>([]);
  const [emailSubject, setEmailSubject] = React.useState<string>('');
  const [emailBody, setEmailBody] = React.useState<string>('');
  const [activeInput, setActiveInput] = React.useState<string>('');
  const [isChanged, setChanged] = useState(false);

  const dispatch = useDispatch();
  const updateApplicationSetting = useCallback(
    (setting: ApplicationSetting) => {
      dispatch(updateApplicationSettingAction('push-email-settings', setting));
    },
    [dispatch]
  );

  const formRef = useRef<
    FormikProps<{
      emailSubject: string;
      emailBody: string;
    }>
  >(null);
  const subjectRef = useRef<any>(null);
  const bodyRef = useRef<any>(null);

  useEffect(() => {
    if (pushEmailSetting?.recipients) {
      setRecipients(pushEmailSetting.recipients);
      setEmailSubject(pushEmailSetting.subject);
      setEmailBody(pushEmailSetting.body);
    }
    setChanged(false);
  }, [pushEmailSetting]);

  const handleSubmit = (values: {
    emailSubject: string;
    emailBody: string;
  }) => {
    const setting: ApplicationSetting = {
      pushEmailSettings: {
        recipients,
        subject: values.emailSubject,
        body: values.emailBody
      }
    };
    updateApplicationSetting(setting);
  };

  const handleAddChip = (added: string) => {
    setRecipients([...recipients, added]);
    setChanged(true);
  };

  const handleDeleteChip = (deleted: string) => {
    setRecipients(recipients.filter(chip => chip !== deleted));
    setChanged(true);
  };

  const handlePlaceholderClick = (placeholder: string) => {
    if (activeInput === 'emailSubject') {
      subjectRef.current.focus();
      document.execCommand('insertText', false, placeholder);
    } else if (activeInput === 'emailBody') {
      bodyRef.current.focus();
      document.execCommand('insertText', false, placeholder);
    }
  };

  return (
    <LoadingOverlay active={loading}>
      <Container title="Create Email Template" className={classes.container}>
        <Formik
          initialValues={{
            emailSubject,
            emailBody
          }}
          enableReinitialize
          onSubmit={values => handleSubmit(values)}
          validationSchema={Schema}
          innerRef={formRef}>
          {({ validateForm, handleChange, values }) => {
            const handleValueChange = (
              e: React.ChangeEvent<HTMLTextAreaElement>
            ) => {
              handleChange(e);
              setChanged(true);
            };

            return (
              <Form>
                <FormGroup>
                  <LabelWapper
                    label="Email recipients"
                    containerStyle={classes.labelWrapper}
                    labelStyle={classes.label}
                    control={
                      <div
                        className={`${classes.contentContainer} ${classes.chipContainer}`}>
                        <ChipInput
                          value={recipients}
                          onAdd={chip => handleAddChip(chip)}
                          onDelete={(chip, index) => handleDeleteChip(chip)}
                          onFocus={() => setActiveInput('recipients')}
                        />
                      </div>
                    }
                  />

                  <LabelWapper
                    label="Email subject"
                    containerStyle={classes.labelWrapper}
                    labelStyle={classes.label}
                    control={
                      <TextareaAutosize
                        containerStyle={classes.contentContainer}
                        textareaStyle={classes.contentInput}
                        name="emailSubject"
                        value={values.emailSubject}
                        onChange={handleValueChange}
                        onFocus={() => setActiveInput('emailSubject')}
                        ref={subjectRef}
                      />
                    }
                  />

                  <LabelWapper
                    label="Email body"
                    containerStyle={classes.labelWrapper}
                    labelStyle={classes.label}
                    control={
                      <TextareaAutosize
                        containerStyle={classes.contentContainer}
                        textareaStyle={classes.contentInput}
                        rowsMin={15}
                        name="emailBody"
                        value={values.emailBody}
                        onChange={handleValueChange}
                        onFocus={() => setActiveInput('emailBody')}
                        ref={bodyRef}
                      />
                    }
                  />

                  <LabelWapper
                    label="Insert placeholders"
                    containerStyle={classes.mb2}
                    labelStyle={classes.label}
                    control={
                      <ButtonGroup
                        options={placeholders}
                        handleClick={handlePlaceholderClick}
                        buttonStyle={classes.groupButton}
                        containerStyle={classes.group}
                      />
                    }
                  />

                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    className={classes.saveButton}
                    disabled={!isChanged}>
                    SAVE CHANGES
                  </Button>
                </FormGroup>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </LoadingOverlay>
  );
};

export default PushEmailSettings;
