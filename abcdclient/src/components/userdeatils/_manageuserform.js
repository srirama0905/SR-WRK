import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { InsertUserDetails } from "../../redux/actions/_authuseraction";

import UserForm from "./_userform";
import CutomAlerts from "../reusablecomponents/_alertmessages";
import { DeleteLocalStorage } from "../../utilities/_commomfuncs";
import {useCookieValid}  from "../authentication/_isCookievalid";


//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state

    const update = useCallback(() => {
        setValue(value => value + 1);// update the state to force render
    }, [])
    return update;
  
}
export function ManageUser({
    InsertUserDetails,
    history,
    ...props
}) {
    const [usrDetails, setusrDetails] = useState({ ...props.UserDetails });
    const isCookie  = useCookieValid();
    const [value, setValue] = useState(0); // integer state
  
    useEffect(() => {
      
    }, [value]);
  
  

    const onSubmit = objuserDetails => {
        const usrdetails = Object.assign(usrDetails, objuserDetails)
        InsertUserDetails(usrdetails).then(() => {
        }).catch(error => {
            console.log("Error Code..." + error);
        });

    };
    const handleChange = event => {
        const { name, value } = event.target;
        setusrDetails(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const reset =(values) => {
        setusrDetails(prevData => ({
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
        if (!values.email) {
            errors.email = 'Required';
        }
        if (values.isTrailUser === true) {
            if (!values.trailStDate) {
                errors.trailStDate = 'Required';
            } if (!values.trailEndDate) {
                errors.trailEndDate = 'Required';
            }

        } else {
            if (!values.subscriptionStDate) {
                errors.subscriptionStDate = 'Required';
            } if (!values.subscriptionEdDate) {
                errors.subscriptionEdDate = 'Required';
            }
        }
        return errors;
    };

    function DeleteStorageBySessionOut() {
        if (usrDetails.errorCode == 401 || isCookie === false) {
            DeleteLocalStorage("LoginDetailsStorage");
            window.location = "/login"
        }
        return false;
    }
    return (
        <div>
            {DeleteStorageBySessionOut() === false ? (
                <div>
                    <CutomAlerts alertType={usrDetails.errorCode} Messge={usrDetails.errMsge} />
                    <UserForm
                        onSubmit={onSubmit}
                        handleChange={handleChange}
                        validate={validate}
                        initialValues={usrDetails}
                        reset ={reset}
                        isReset = {true}
                        resetinitialValues={props.UserDetails}
                    />
                </div>
            ) : ""}
        </div>
    );
}

ManageUser.propTypes = {
    history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        UserDetails:state.UserDetails
      };
}

const mapDispatchToProps = {
    InsertUserDetails
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageUser);

