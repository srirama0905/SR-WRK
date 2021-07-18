import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UserRegForm from "./components/registration/_manageuserregform";
import { GetallReferenceData,GetallCountryDetails,GetallQuestionChoice,GetallQuestionDetails } from "./redux/actions/_refdataaction";
/*Import Appplication Labels */
import * as Constants from "./utilities/_appconstants";
import { useStyles } from "./utilities/_menustyle";

const App = (
  {
    GetallReferenceData,
    GetallCountryDetails,
    GetallQuestionChoice,
    GetallQuestionDetails,
    history,
    ...props

  }) => {
  const classes = useStyles();


 const   IntitalLoaData  = async () => {


  await GetallReferenceData ();
  await GetallCountryDetails (Constants.REF_COUNTRY);
  await GetallQuestionChoice (Constants.REF_QUESTION);
  await GetallQuestionDetails ();

}
  useEffect(  () => {
    IntitalLoaData();
  }, []);
 
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <>
            <div>
              <Route exact path="/" component={UserRegForm} ></Route>
            </div>
          </>
        </Switch>
      </main>
    </div>
  );
}
function mapStateToProps(state, ownProps) {
  return {

  };
}
const mapDispatchToProps = {
  GetallReferenceData,
  GetallCountryDetails,
  GetallQuestionChoice,
  GetallQuestionDetails
};

App.propTypes = {
  history: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(App);


