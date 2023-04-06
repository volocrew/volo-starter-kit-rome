import React, { useMemo, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import { StepButton, Orientation } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    stepper: {
      background: theme.palette.background.default,
      paddingTop: 0
    },
    content: {
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(2)
    },
    children: {
      height: 150
    },
    button: {
      marginRight: theme.spacing(2),
      borderRadius: theme.spacing(2),
      paddingLeft: 20,
      paddingRight: 20,
      height: 36,
      textTransform: 'uppercase'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

type Props = {
  steps: string[];
  alternativeLabel?: boolean;
  orientation?: Orientation;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  initial: {
    activeStep: number;
    completed: { [k: number]: boolean };
  };
  contentStyle?: string;
};

const Wizard: React.FC<Props> = ({
  steps,
  alternativeLabel,
  orientation,
  activeStep,
  setActiveStep,
  children,
  initial,
  contentStyle
}: Props) => {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );

  useEffect(() => {
    setActiveStep(initial.activeStep);
    setCompleted(initial.completed);
  }, []);

  const totalSteps = useMemo(() => {
    return steps.length;
  }, [steps]);

  const isLastStep = () => {
    return activeStep === totalSteps - 1;
  };

  const allStepsCompleted = () => {
    return totalSteps === Object.keys(completed).length;
  };

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel={alternativeLabel}
        orientation={orientation}
        nonLinear
        activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className={classes.content}>
        <div className={`${classes.children} ${contentStyle}`}>{children}</div>
        {activeStep === totalSteps ? (
          <Button
            onClick={handleReset}
            className={classes.button}
            color="primary">
            Reset
          </Button>
        ) : (
          <div>
            <Button
              disabled={activeStep === 0}
              variant="contained"
              color="primary"
              onClick={handleBack}
              className={classes.button}
              size="small">
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
              className={classes.button}
              size="small">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

Wizard.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal',
  contentStyle: ''
};

export default Wizard;
