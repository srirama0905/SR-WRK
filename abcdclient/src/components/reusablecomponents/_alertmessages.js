import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CutomAlerts = ({
    Messge,
    alertType
}
) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {alertType === 500   ? (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                      <strong> {Messge}</strong>
                </Alert>) : " "}

            {alertType === 300 || alertType === 422 || alertType === 700 || alertType === 403 ? (
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    <strong> {Messge}</strong>
                </Alert>) : " "}
            {alertType === 100 ? (
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    <strong> {Messge}</strong>
                </Alert>
            ) : " "}
            {alertType === 200 ? (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    <strong> {Messge}</strong>
                </Alert>
            ) : " "}


        </div>
    );
}
CutomAlerts.propTypes = {
    Messge: PropTypes.string.isRequired,
    alertType: PropTypes.number
};
export default CutomAlerts;