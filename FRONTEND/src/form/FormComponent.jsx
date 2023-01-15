import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Field, Form, Formik} from "formik";
import { TextField } from "formik-mui";
import axios from "axios";
import React, { useState } from "react";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: "John",
            lastName: "Doe",
            currentLoanAmount: "10000",
            term: "2",
            creditScore: "700",
            annualIncome: "75000",
            yearsInCurrentJob: "5",
            homeOwnership: "1",
            purpose: "10",
            monthlyDebt: "33000",
            yearsOfCreditHistory: "5",
            numberOfOpenAccounts: "6",
            numberOfCreditProblems: "0",
            currentCreditBalance: "20000",
            maximumOpenCredit: "40000",
            bankruptcies: "0",
            taxLiens: "0"
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log("values", values);
          }}
        >
          <FormikStep label="Step 1">
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="firstName"
                component={TextField}
                label="First Name"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="lastName"
                component={TextField}
                label="Last Name"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="currentLoanAmount"
                component={TextField}
                label="Current Loan Amount"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="term"
                component={TextField}
                label="Term"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="creditScore"
                component={TextField}
                label="Credit Score"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="annualIncome"
                component={TextField}
                label="Annual Income"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="yearsInCurrentJob"
                component={TextField}
                label="years In Current Job"
              />
            </Box>
          </FormikStep>
          <FormikStep label="Step 2">
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="homeOwnership"
                component={TextField}
                label="Home Ownership"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="purpose"
                component={TextField}
                label="Purpose"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="monthlyDebt"
                component={TextField}
                label="Monthly Debt"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="yearsOfCreditHistory"
                component={TextField}
                label="Years of Credit History"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="numberOfOpenAccounts"
                component={TextField}
                label="Number of Open Accounts"
              />
            </Box>
          </FormikStep>
          <FormikStep label="Step 3">
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="numberOfCreditProblems"
                component={TextField}
                label="Number of Credit Problems"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="currentCreditBalance"
                component={TextField}
                label="Current Credit Balance"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="maximumOpenCredit"
                component={TextField}
                label="Maximum Open Credit"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="bankruptcies"
                component={TextField}
                label="Bankruptcies"
              />
            </Box>
            <Box style={{ marginBottom: "1%" }}>
              <Field
                fullWidth
                name="taxLiens"
                component={TextField}
                label="Tax Liens"
                description="random"
              />
            </Box>
          </FormikStep>
        </FormikStepper>

      </CardContent>
    </Card>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const [predictionString, setPredictionString] = useState("");
  const updatePredictionValues = (response) => {
    if (response !== "") {
      if (response.data === 1) {
        setPredictionString("Great! You have been approved we can Grant you the Loan.")
      }
      else if (response.data === 0) {
        setPredictionString("Sorry! We cannot process your request right now, how about you try again!")
      }
    }
    else {
      setPredictionString("");
    }
  }

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const predictValues = (values) => {
    delete values.firstName;
    delete values.lastName;
    const requestValues = { "data": values };
    return axios.post('https://bank-loan-status-production.up.railway.app/predict_api', requestValues)
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          try {
            const response = await predictValues(values)
            updatePredictionValues(response);
            console.log("outputting response", response);
          } catch (e) {
            if (e.response.status === 422) {
              for (const fieldKey in e.response.data) {
                const errorMessages = e.response.data[fieldKey]
                helpers.setFieldError(fieldKey, errorMessages[0])
              }
            }
          }
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }
      }
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {predictionString !== ""
            && isLastStep()
            ?
            <React.Fragment>
              <Box style={{ marginBottom: "1%" }}>
                <p>
                  {predictionString}
                </p>
              </Box>
            </React.Fragment>
            :
            currentChild
          }

          <Grid container justifyContent="center" spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting && predictionString === ""}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Predict" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
