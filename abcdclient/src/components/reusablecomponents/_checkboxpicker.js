import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Field } from 'react-final-form';
import { Checkbox } from 'final-form-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControlLabel,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    labelRoot: {
        fontSize: 25
    }
})
);
const CustomCheckBox = (
    {
        Label,
        Name,
        Type,
        Value,
        checked,
        isMulti
    }
) => {
    const classes = useStyles();
 
    return (
        <div>
            {isMulti === true ? (
                <FormControlLabel
                    label={Label}
                    control={
                        <Field
                            name={Name}
                            component={Checkbox}
                            type={Type}
                            checked= {true}
                            value={Value}
                         
                        />
                    }
                />) : (<FormControlLabel
                    label={Label}
                    control={
                        <Field
                            name={Name}
                            component={Checkbox}
                            type={Type}
                        />
                    }
                />)
            }
        </div>
    )
}
CustomCheckBox.propTypes = {
    isMulti: PropTypes.bool.isRequired,
    Label: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Value: PropTypes.number.isRequired
};
export default CustomCheckBox;
