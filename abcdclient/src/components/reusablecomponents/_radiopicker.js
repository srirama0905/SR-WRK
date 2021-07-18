import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Field } from 'react-final-form';
import { Radio } from 'final-form-material-ui';
import {
    FormControlLabel,
} from '@material-ui/core';

const CustomRadio  = (
    {
        Label,
        Name,
        Type,
        Value
    }
) => {
    return (
        <FormControlLabel
        label={Label}
        control={
            <Field
                name={Name}
                component={Radio}
                type={Type}
                value ={Value}
            />
        }
    />
    )
}
CustomRadio.propTypes = {
    Label: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Value: PropTypes.string.isRequired,
};
export default CustomRadio;
