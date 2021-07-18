
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';

import "./regis.css";

import TrainingDetails from './trainingdetails';
import { useStyles } from "./_regis";
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    FormLabel,
    FormGroup,
    FormControl,
} from '@material-ui/core';
import CutomTextField from "../reusablecomponents/_textbox";
import CustomDropdown from "../reusablecomponents/_dropdownlist";

/*Import Appplication Labels */
import * as Constants from "../../utilities/_labelinfo";

const UserRegForm = ({
    onSubmit,
    initialValues,
    resetinitialValues,
    validate,
    reset,
    isReset,
    Questions,
    QuestionChoices,
    handleChange
}) => {
    const classes = useStyles();
    const GetallQuestion = () => {
        return (
            <div>
                {
                    Questions.map((text, hdrindex) => {
                        let _QuestionObject = initialValues.question.filter(x=> x.questionIDFK == text.questionsIDPK);
                        //.log(_QuestionObject);
                        return (
                            
                                <div>
                                    
                                <label index ={text.questionsIDPK}>{text.questiondesc}</label>
                                {text.questiontype == 1 ? <div>
                                    <CustomDropdown 
                                        TDID= { text.questionsIDPK }
                                        Error={true} value={_QuestionObject !=null && _QuestionObject.length > 0 ? _QuestionObject[0].answercomboID : -1}
                                        _data={QuestionChoices[0]}
                                        isrequired={true}
                                        _displaytext={"comboDesc"}
                                        _bindvaluetext={"comboDetailIDPK"}
                                        handleChange={handleChange}/>
                                        </div> : <div>
                                        <input type="text" onChange={handleChange}value={EventTarget.value} placeholder="enter the details" name={text.questionsIDPK} /><p>{text.questionsIDPK}</p></div>} 
                                {/*<Divider />*/}
                                </div>
                        )
                    }
                    )
                }
            </div>
        )
    }
    return (
      
            <div className ="root">
             <div className ="div1" ><Box >New Content1</Box>
            </div>
        
            <div className ="div2" ><TrainingDetails />
            </div>
        

        <div className ="div3">
            <CssBaseline />
            <Typography  variant="h5"  component="h1" gutterBottom>
                {Constants.LABEL_REG_USER}
            </Typography>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                reset={reset}
                initialValues={isReset === true ? resetinitialValues : initialValues}
                render={({ handleSubmit, reset, submitting, pristine, values, form }) => (
                    <form onSubmit={handleSubmit} noValidate>
                            <Grid container  spacing={0} direction="column"  >
                                <Grid item xs={12}  >
                                    <CutomTextField Type="text" Name="firstName" Label={Constants.LABEL_FIRST_NAME} isrequired={1} />
                                </Grid>
                                <Grid item xs={12} >
                                    <CutomTextField Type="text" Name="lastName" Label={Constants.LABEL_LAST_NAME} isrequired={1} />
                                </Grid>
                                <Grid item xs={12}>
                                    <CutomTextField Type="email" Name="emailId" Label={Constants.LABEL_EMAIL} isrequired={1} />
                                </Grid>
                                <Grid item xs={12} >
                                    <CutomTextField Type="text" Name="phoneNumber" Label={Constants.LABEL_PHONENUMBER} isrequired={1} />
                                </Grid>
                            
                                    <Grid item xs={12}>
                                    {GetallQuestion()}
                                </Grid>
                                <div style={{display : 'flex' }}>
                                <Grid item style={ {marginTop: 16,paddingRight : 10} }>
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
                                </div>
                            </Grid>
                        {/*<pre>{JSON.stringify(values, 0, 2)}</pre> */}
                    </form>
                )}
            />
        </div>
        </div>
      
  
    );
}
UserRegForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    resetinitialValues: PropTypes.object.isRequired,
    Questions: PropTypes.array,
    QuestionChoices: PropTypes.array,
    validate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    isReset: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
};
export default UserRegForm;
