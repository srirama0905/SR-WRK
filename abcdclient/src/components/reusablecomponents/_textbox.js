import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    labelRoot: {
        fontSize: 22,
         
       
    }
})
);
const CutomTextField = (
    {
        Label,
        Name,
        Type,
        isrequired
    }
) => {
    const classes = useStyles();
    let input ="abc";
    return (
        <div  >
            { parseInt(isrequired) === 1 ? (
                <Field fullWidth required name={Name} component={TextField} type={Type} label={Label}
                    
                    
                 
                />) : (
                    <Field fullWidth  name={Name} component={TextField} type={Type} label={Label}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.labelRoot
                        }
                    }}
                />
                ) }
        </div>
    )
}
CutomTextField.propTypes = {
    Label: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    isrequired: PropTypes.number
};
export default CutomTextField;
