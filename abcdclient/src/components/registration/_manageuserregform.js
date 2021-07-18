import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { InsertUserRegDetails } from "../../redux/actions/_authuseraction";

import UserRegForm from "./registarationform";
import HeaderMenu from './_header';
import Footer from './_footer';


export function ManageRegUser({
    InsertUserRegDetails,
    history,
    ...props
}) {
    const [usrRegDetails, setusrRegDetails] = useState({ ...props.UserRegistrationDetails });
    const [value, setValue] = useState(0); // integer state
  
    useEffect(() => {
      
    }, [value]);
  
    const onSubmit = async objuserDetails => {
       objuserDetails.traingIDFK =2;
       const usrdetails = Object.assign(usrRegDetails, objuserDetails)
        await InsertUserRegDetails(usrdetails).then(() => {
        }).catch(error => {
            console.table("Error Code..." + error);
        }); 
        alert("hello");
  
    };
    const handleChange =event =>{
        let _QuestionObject = usrRegDetails.question.filter(x=> x.questionIDFK ===event.currentTarget.id || x.questionIDFK === event.currentTarget.name);
        if(_QuestionObject !=null && _QuestionObject.length > 0){
            //console.log(typeof(event.target.value));
            if(typeof(event.target.value) === "number"){
                _QuestionObject[0].answercomboID = event.target.value;
            }
            else{
                _QuestionObject[0].answersDesc = event.target.value;
            }
        }
        else{
            console.log(typeof(event.target.value));
            if(typeof(event.target.value) == "number"){
                
                let _question = {regUserID:-1,questionIDFK : event.currentTarget.id,answersDesc: "",answercomboID : event.target.value,traingIDFK:2}
                _question.answercomboID = event.target.value;
                 usrRegDetails.question.push(_question);
                 console.log(_question);
                 console.log((event.target.value),"numberr");
            }
            else{
                let _question = {regUserID:-1,questionIDFK : event.currentTarget.name,answersDesc: event.target.value,answercomboID : 1,traingIDFK:2}
                _question.answersDesc = event.target.value;
                usrRegDetails.question.push(_question);
                console.log(_question);
                console.log(event.target.value,"non-number");
            }
           
        }
         setValue (value+1);
    }

    
    const reset =(values) => {
        setusrRegDetails(prevData => ({
            ...prevData,
            firstName: "Hello"
        }));
        setValue(value => value + 1);// update the state to force render

    }
    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.emailId) {
            errors.emailId = 'Required';
        }
        return errors;
    };

    return (
        <div>
            <div><HeaderMenu /></div>
                <div>
                    <UserRegForm
                        onSubmit={onSubmit}
                        handleChange={handleChange}
                        validate={validate}
                        initialValues={usrRegDetails}
                        reset ={reset}
                        isReset = {true}
                        resetinitialValues={props.UserRegistrationDetails}
                        QuestionChoices={props.RefQueschoice}
                        Questions={props.RefQuestions}
                    />
                </div>
                <Footer />
        </div>
    );
}

ManageRegUser.propTypes = {
    history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        UserRegistrationDetails:state.UserRegistrationDetails,
        RefQueschoice:state.RefQuestionchoice,
        RefQuestions:state.RefQuestions
      };
}

const mapDispatchToProps = {
  InsertUserRegDetails
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageRegUser);

