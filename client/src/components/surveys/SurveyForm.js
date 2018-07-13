import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails.js";
import formFields from "./formFields.js";


//surveyForm shows a form for a user to add input
class SurveyForm extends Component{

  renderFields(){
    return _.map(formFields, field => {
      return <Field key={ field.name }component={SurveyField} type="text" label={field.label} name={field.name}/>
    });
  }

  render(){
    //this.props.handleSubmit is provided by reduxForm import
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit) } >
          { this.renderFields() }
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
          <Link to="/surveys" className="red btn-flat left white-text" type="submit">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  errors.recipients = validateEmails(values.recipients || " ");

  _.each(formFields, (field) => {
    if(!values[field.name]){
      errors[field.name] = "You must provide " + field.name;
    }
  });


  return errors;
}

//similarity with the connect function
export default reduxForm({
  form: "surveyForm",
  validate: validate,
  destroyOnUnmount: false
})(SurveyForm);
