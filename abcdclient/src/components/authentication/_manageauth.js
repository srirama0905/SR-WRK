import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { ValidateAuthUser } from "../../redux/actions/_authuseraction";
/*Load Reference Data One time */
import { GetallReferenceData } from "../../redux/actions/_refdataaction";
import PropTypes from "prop-types";
import SignIn from "./_loginpage";

import {LoginDetails} from "../../utilities/_initialModel";

export function ManageAuthuser({
    ValidateAuthUser,
    GetallReferenceData,
    history,
    ...props
}) {
    const [LoginDtls, SetLoginDtls] = useState({ ...props.LoginDetails });
    const [errors, setErrors] = useState({});
    const [ProcesssubmitData, setProcesssubmitData] = useState(false);

 
    function handleChange(event) {
        const { name, value } = event.target;
        SetLoginDtls(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

      function SubmitLogin(event) {
        event.preventDefault();
        setProcesssubmitData(true);
         ValidateAuthUser(LoginDtls)
            .then(() => {
              
             
                 GetallReferenceData();
                 setProcesssubmitData(false);
                history.push("/");
            })
            .catch(error => {
                setProcesssubmitData(false);
                setErrors({ onSubmit: error.message });
            });
    }

    return LoginDtls.length === 0 || LoginDtls.length === 0 ? (
        <CircularProgress />
    ) : (
            <SignIn
                LoginDtls={LoginDtls}
                errors={errors}
                handleChange={handleChange}
                SubmitLogin={SubmitLogin}
                ProcesssubmitData={ProcesssubmitData}
            />
        );
}

ManageAuthuser.propTypes = {
    LoginDetails: PropTypes.object.isRequired,
    ValidateAuthUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const isLogout =ownProps.match.params.islogout;
  
    return {
        LoginDetails: isLogout == 1 ? {...state.LoginDetails,LoginDetails} :state.LoginDetails
    };
}

const mapDispatchToProps = {
    ValidateAuthUser,
    GetallReferenceData
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageAuthuser);
