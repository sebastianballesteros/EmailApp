import React from "react";
import { connect }  from "react-redux";
import formFields from "./formFields.js";
import _ from "lodash";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = (props) => {

  const reviewFields = _.map(formFields, field => {
    return (
        <div key={field.name}>
          <label> { field.label }</label>
          <div>
            { props.formValues[field.name] }
          </div>
        </div>
    );
  });


  return (
    <div className="container center right-align">
      <h5> Please confirm your entries </h5>
      { reviewFields }
      <button
        className="yellow darken-3 btn-flat"
        onClick= { props.onCancel }
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={ () => props.submitSurvey (props.formValues, props.history) }

      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

//whatever we return will show as props to the component (SurveyFormReview)
function mapStateToProps(state){
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions) (withRouter(SurveyFormReview));
