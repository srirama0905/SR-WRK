
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import PropTypes from "prop-types";
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    FormLabel,
    RadioGroup,
    FormGroup,
    FormControl,
} from '@material-ui/core';
import CutomTextField from "../reusablecomponents/_textbox";
import CustomCheckBox from "../reusablecomponents/_checkboxpicker";

/*Import Appplication Labels */
import * as Constants from "../../utilities/_labelinfo";

const UserForm = ({
    onSubmit,
    initialValues,
    resetinitialValues,
    validate,
    reset,
    isReset
}) => {

    return (
        <div style={{ padding: 1, margin: 'auto' }}>
            <CssBaseline />
            <Typography variant="h5" align="left" component="h1" gutterBottom>
                {Constants.LABEL_HDR_USRDTLS}
            </Typography>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                reset={reset}
                initialValues={isReset === true ? resetinitialValues : initialValues}
                render={({ handleSubmit, reset, submitting, pristine, values, form }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={6}>
                                    <CutomTextField Type="text" Name="firstName" Label={Constants.LABEL_FIRST_NAME} isrequired={1} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CutomTextField Type="text" Name="lastName" Label={Constants.LABEL_LAST_NAME} isrequired={1} />
                                </Grid>
                                <Grid item xs={12}>
                                    <CutomTextField Type="email" Name="email" Label={Constants.LABEL_EMAIL} isrequired={1} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomCheckBox Type="checkbox" Name="isActive" Label={Constants.LABEL_ACTIVE} isMulti={false} />
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomCheckBox Type="checkbox" Name="isTrailUser" Label={Constants.LABEL_TRAIL_USER} isMulti={false} />
                                </Grid>
                                {values.isTrailUser === false || values.isTrailUser === 0 ? (
                                    <>
                                        <Grid item xs={6}>
                                            <CutomTextField Type="date" Name="subscriptionStDate" Label={Constants.LABEL_SUBSCRIPTION_ST_DATE} isrequired={1} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CutomTextField Type="date" Name="subscriptionEdDate" Label={Constants.LABEL_SUBSCRIPTION_END_DATE} isrequired={1} />
                                        </Grid>
                                    </>) : ""}
                                {values.isTrailUser === true ? (
                                    <>
                                        <Grid item xs={6}>
                                            <CutomTextField Type="date" Name="trailStDate" Label={Constants.LABEL_TRAIL_ST_DATE} isrequired={1} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CutomTextField Type="date" Name="trailEndDate" Label={Constants.LABEL_TRAILEND_DATE} isrequired={1} />
                                        </Grid>
                                    </>
                                )
                                    : ""}
                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Roles</FormLabel>
                                        <FormGroup row>
                                            <CustomCheckBox Type="checkbox" Name="roles" Label={Constants.LABEL_ADMIN_ROLE} Value={6} isMulti={true} />
                                            <CustomCheckBox Type="checkbox" Name="roles" Label={Constants.LABEL_MGMT_ROLE} Value={3} isMulti={true} />
                                            <CustomCheckBox Type="checkbox" Name="roles" Label={Constants.LABEL_USER_ROLE} Value={7} isMulti={true} />
                                            <CustomCheckBox Type="checkbox" Name="roles" Label={Constants.LABEL_QA_ROLE} Value={5} isMulti={true} />
                                            <CustomCheckBox Type="checkbox" Name="roles" Label={Constants.LABEL_GUEST_ROLE} Value={8} isMulti={true} />

                                        </FormGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={(event) => { form.reset(); }}
                                        disabled={submitting || pristine}
                                    >
                                        {Constants.LABEL_BTN_RESET}
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting || pristine}
                                    >
                                        {Constants.LABEL_BTN_SUBMIT}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        {/*<pre>{JSON.stringify(values, 0, 2)}</pre> */}
                    </form>
                )}
            />
        </div>
    );
}
UserForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    resetinitialValues: PropTypes.object.isRequired,
    validate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    isReset: PropTypes.bool.isRequired
};


export default UserForm;
