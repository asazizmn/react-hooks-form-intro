import React from 'react';
import './index.css';


/**
 * Main component that comprises of the React Form
 */
const App = () => {
  return (
    <div class="form-container">
      <form class="register-form">
        <TextInput
          id="first-name"
          name="firstName"
          placeholder="First Name"
          tooltip="Enter your first name"
        />

        <TextInput
          id="last-name"
          name="lastName"
          placeholder="Last Name"
          tooltip="Enter your last name"
        />

        <TextInput
          id="email"
          name="email"
          placeholder="Email"
          tooltip="Enter your email address"
        />

        <button class="form-field" type="submit" title="Submit registration form">
          Register
        </button>

      </form>
    </div>
  );
};



const TextInput = props => {
  return (
    <input
      type="text"
      class="form-field"
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      title={props.tooltip}
    />
  );
};

export default App;
