import React from 'react';
import './index.css';


/**
 * Main component that comprises of the React Form
 */
const App = () => {

  // `useState(initialValue)` takes in an argument to set the initial state
  // ... it then returns a reference to the state and 
  // ... and function to allow changing the state at a later stage 
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  
  return (
    <div class="form-container">
      <form class="register-form">

        {/* <div class="success-message">Success! Thank you for registering</div> */}

        <TextInput
          id="first-name"
          name="firstName"
          placeholder="First Name"
          title="Enter your first name"
          value={values.firstName}
        />

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

        <button class="form-field" type="submit" title="Submit registration form">
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
      class="form-field"
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      title={props.title}
      value={props.value}
    />

    /* <span id={props.id + '-error'}>{props.title}</span> */
  );
};

export default App;
