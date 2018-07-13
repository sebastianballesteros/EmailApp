//surveyfield contains logic to render a single label and text input
import React from "react";

//input is object with a lot of fields
export default ( { input, label, meta } ) => {
  //...input same as onBlur={input.onBlur} onChange={input.onChange}
  return (
    <div>
      <label> {label} </label>
      <input {...input } style={ { marginBottom: "5px" }} />
      <div className="red-text" style={ { marginBottom: "20px" }}>
        { meta.touched && meta.error }
      </div>
    </div>
  );
}
