import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";


//surveyNew shows SurveyForm and SurveyForm Review
class SurveyNew extends Component{

  constructor(props){
    super(props);
    this.state = { new: true };
  }

  state = { showFormReview: false };

  renderContent(){
    if(this.state.showFormReview === true) {
      return (
        <SurveyFormReview
          onCancel={ () => this.setState({ showFormReview: false })}
        />
      );
    }
    //callback in SurveyForm
    return <SurveyForm onSurveySubmit={ () => this.setState({ showFormReview: true })} />
  }

  render(){
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

//clearing out values 
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
