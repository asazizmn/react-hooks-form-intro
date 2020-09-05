import React, { useState } from 'react';
import './index.css';


/**
 * Main component that comprises of the React Form
 */
const App = () => {

  // `useState(initialValue)` takes in an argument to set the initial state
  // ... it then returns a reference to the state and 
  // ... and function to allow changing the state at a later stage 
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  
  return (
    <div className="form-container">
      <form className="register-form">

        {/* <div class="success-message">Success! Thank you for registering</div> */}

        <input
          type="text"
          className="form-field"
          id="first-name"
          name="firstName"
          placeholder="Enter First Name"
          title="Enter your first name"
          // value={values.firstName}
          // value={values.firstName}
          // onChange={(event) => setValues['firstName'] = event.target.value}
          // onChange={(event) => {
          //   console.log('in state: ', setValues.firstName);
          //   console.log('target.value: ', event.target.value);
          //   }}
        />


        {/* <TextInput
          id="first-name"
          name="firstName"
          placeholder="First Name"
          title="Enter your first name"
          value={values.firstName}
          setValues={setValues}
        /> */}

        <TextInput
          id="last-name"
          name="lastName"
          placeholder="Last Name"
          title="Enter your last name"
          value={values.lastName}
        />

        <TextInput
          id="email"
          name="email"
          placeholder="Email"
          title="Enter your email address"
          value={values.email}
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
  return (
    <input
      type="text"
      className="form-field"
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      title={props.title}
      value={props.value}
      // onChange={() => props.setValues[props.name] = props.value}
    />

    /* <span id={props.id + '-error'}>{props.title}</span> */
  );
};

export default App;
