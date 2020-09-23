/***
 * App.js | react-hooks-form-intro
 * - a simple react based registration form (no API calls made)
 * - once the form has been submitted, it will be validated
 * - an overall valid submission results in a successful submission
 * 
 * Pls Nt
 * - This app would normally require an API call.
 *   However, that is out side the scope of this project
 * - All state variables are currenlty shared through `props`.
 *   However, normally a global variable would be shared through Context API instead
 */



import React, { useState } from 'react';
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

  // represents the form's submission state, 
  // ... as in whether or not the button has been pressed, valid or invalid
  // ... so it does not necessarily mean a successful submission
  const [submitted, setSubmitted] = useState(false);

  // represents the form's overall validity state
  // it is only taken into consideration after user has tried to submit the form
  const [success, setSuccess] = useState(false);


  /*
   * form submission handler
   * defines the actions to happen when the register button is pressed
   */
  const handleSubmit = event => {

    // [DEBUG] ////////////////////////////
    // console.log('entered handleSubmit');
    ////////////////////////////////////////////////////

    // original default behaviour of onSubmit causes the entire page to refresh
    // ... to prevent this and then be able to view the displayed message
    event.preventDefault();

    // setSubmitted((!values.firstName || !values.lastName || !values.email) ? false : true);
    setSubmitted(true);

    // when all fields are valid set as successful
    setSuccess(!!(values.firstName && values.lastName && values.email));

    // [DEBUG] ////////////////////////////
    // console.log('[success]', success);
    // console.log('[submitted]', submitted);
    // console.log('exiting handleSubmit');
    ////////////////////////////////////////////////////
  };

  
  /* onChange event handler to ensure that new values are updated in the state */
  const handleChange = event => {

    // [DEBUG] ////////////////////////////
    // console.log('entered handleChange');
    ////////////////////////////////////////////////////

    // since we are saving target values into separate variables to be reused
    // `event.persist` is not required
    // event.persist();
    
    // however, if `event.target.*` was used direclty within the upcoming callback
    // ... `event.persist()` would be required
    // ... to retain the event target and avoid Synthetic Event being "pooled"
    // ... and as a result the event.target.* being nullified by React
    // ref:- https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6

    // however, this approach of saving into variables is better for performance
    // instead of trying to hold up `event` for callback use through `event.persist`
    const name = event.target.name;
    const value = event.target.value;

    // the fat arrow function is builing a new values object for the state
    // ... and the resulting object literal is implicitly being returned to `setValues`
    // please note that without the paranthesis around the object literal, 
    // ... the braces would be mistaken for the function body!
    setValues(oldValues => ({
      ...oldValues,
      [name]: value
    }));

    // reset the form submission state to allow for next submission
    // if (submitted) setSubmitted(false);
  };

  // ??????????? What for ??????????????
  // useEffect(() => console.log(success), [success])

  // once the values have been confirmed as valid, "submission" is a "success"
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
          // please note that this application shares variables via `props`
          // however, global variables would make more sense to be shared through Context API
        }
        <TextInput
          id="first-name"
          name="firstName"
          placeholder="First Name"
          title="Enter your first name"
          value={values.firstName}
          submitted={submitted} // should have used Context API instead
          success={success} // should have used Context API instead
          handleChange={handleChange}
        />

        <TextInput
          id="last-name"
          name="lastName"
          placeholder="Last Name"
          title="Enter your last name"
          value={values.lastName}
          submitted={submitted} // should have used Context API instead
          success={success} // should have used Context API instead
          handleChange={handleChange}
        />

        <TextInput
          id="email"
          name="email"
          placeholder="Email"
          title="Enter your email address"
          value={values.email}
          submitted={submitted} // should have used Context API instead
          success={success} // should have used Context API instead
          handleChange={handleChange}
        />

        {
          // simulation to show "register" button vs "success" message
          // normally depending on  whether submission response is 'ok' (200) or not
          submitted && success ? 
            <div className="success-message fade-in">Success! Thank you for registering.</div> :
            <button className="form-field" type="submit" title="Submit registration form">Register</button>
        }

      </form>
    </div>
  );
};



/**
 * TextInput component that defines the input
 * along with the associated error message
 */
const TextInput = props => {
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
        disabled={props.success}
        // disabled={props.submitted && props.value}
        onChange={props.handleChange}
      />

      {
        // `props.submitted` assumes that the values are valid as well!
        // props.submitted && !props.success && <span id={props.id + '-error'}>{props.title}</span>
        props.submitted && !props.value && <span id={props.id + '-error'} className="fade-in">{props.title}</span>
      }
    </>
  );
};



export default App;
