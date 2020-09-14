/**
 * App.js | react-hooks-form-intro
 * - a simple react based registration form (no API calls made)
 * - once the form has been submitted, it willb e validated
 * - a succesful submission is the result of a valid submission
 */



import React, { useState, useEffect } from 'react';
import './index.css';



/**
 * Main component that comprises of the React Form
 */
const App = () => {

  // `useState(initialValue)` takes in an argument to set the initial state
  // ... it then returns a reference to the state and 
  // ... and function to allow changing the state at a later stage 

  // manage state of form fields
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // represents the form's submission state, whether valid or invalid
  const [submitted, setSubmitted] = useState(false);

  // represents the form's validity state
  // it is only taken into consideration after user has tried to submit form
  const [valid, setValid] = useState(false);


  // form submission handler
  const handleSubmit = event => {

    // [DEBUG] ////////////////////////////
    console.log('entered handleSubmit');
    //////////////////////////////////////

    // original default behaviour of onSubmit causes the entire page to refresh
    // ... to prevent this and then be able to view the displayed message
    event.preventDefault();

    setSubmitted(true);
    setValid(!!(values.firstName && values.lastName && values.email))

    // [DEBUG] //////////////////////////////////////////
    console.log('[valid]', valid);
    console.log('[submitted]', submitted);
    console.log('exiting handleSubmit');
    ////////////////////////////////////////////////////
  };

  useEffect(() => console.log(valid), [valid])

  // once the values have been confirmed as "valid", "submission" is successful
  // pls nt that here we just check for truthy or falsy values
  // proper validation for each field type is outside the scope of this tutorial
  // const isValid = !!(values.firstName && values.lastName && values.email);

  /* 
   * this is rendered as html and returned to the frontend
   */
  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>

        {
          // simulated to show once submission response is 'ok' (200)
          submitted && valid && <div className="success-message">Success! Thank you for registering</div>
        }

        <TextInput
          id="first-name"
          name="firstName"
          placeholder="First Name"
          title="Enter your first name"
          value={values.firstName}
          setValues={setValues}
          submitted={submitted}
          valid={valid}
        />

        <TextInput
          id="last-name"
          name="lastName"
          placeholder="Last Name"
          title="Enter your last name"
          value={values.lastName}
          setValues={setValues}
          submitted={submitted}
          valid={valid}
        />

        <TextInput
          id="email"
          name="email"
          placeholder="Email"
          title="Enter your email address"
          value={values.email}
          setValues={setValues}
          submitted={submitted}
          valid={valid}
        />

        <button className="form-field" type="submit" title="Submit registration form">
          Register
        </button>

      </form>
    </div>
  );
};



/**
 * TextInput component that defines the input
 * along with the associated error message
 */
const TextInput = props => {

  /* onChange event handler to ensure that new values are updated in the state */
  const handleChange = event => {

    // if `event.target.*` was used direclty within the callback
    // this would be required due to the asynchronous event handling
    // and to avoid even being "pooled"
    // event.persist();

    // this approach is better for performance
    // instead of trying to hold up `event` for callback use through `event.persist`
    const name = event.target.name;
    const value = event.target.value;

    // the fat arrow function is builing a new values object for the state
    // ... and the resulting object literal is implicitly being returned to `setValues`
    // please note that without the paranthesis around the object literal, 
    // ... the braces would be mistaken for the function body!
    props.setValues(oldValues => ({
      ...oldValues,
      [name]: value
    }));
  };


  return (

    // these "fragments" (<>...</>) are necessary here 
    // ... as react does not allow returning more than a single element at once. 
    // Hence two or more elements must be wrapped within one element
    <>
      <input
        type="text"
        className="form-field"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        title={props.title}
        value={props.value}
        disabled={props.valid}
        onChange={handleChange}
      />

      {
        // `props.submitted` assumes that the values are valid as well!
        props.submitted && !props.valid && <span id={props.id + '-error'}>{props.title}</span>
      }
    </>
  );
};



export default App;
