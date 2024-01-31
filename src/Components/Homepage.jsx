// use this
import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreakdownContext } from './BreakdownContext';

const Homepage = () => {
  const { setOrganization } = useBreakdownContext();

  const [inputs, setInputs] = useState({ organization: '' });
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleEventChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    // // Name validation
    // if (!("userName" in inputs) || inputs.userName.trim() === "") {
    //   newErrors.userName = "Enter a Name";
    //   isValid = false;
    // } else if ("userName" in inputs && !/^[a-zA-Z\s]+$/.test(inputs.userName.trim())) {
    //   newErrors.userName = "Name should only contain letters";
    //   isValid = false;
    // }

    // Organization validation
    if (!("organization" in inputs) || inputs.organization.trim() === "") {
      newErrors.organization = "Enter Your Organization";
      isValid = false;
    } else if ("organization" in inputs && !/^[a-zA-Z\s]+$/.test(inputs.organization.trim())) {
      newErrors.organization = "Organization should only contain letters";
      isValid = false;
    }

    // Account validation (only if organization is 'Sutherlands')
    if (inputs.organization === "Sutherlands") {
      if (!("account" in inputs)) {
        newErrors.account = "Enter your account number";
        isValid = false;
      } else if ("account" in inputs && !/^[a-zA-Z0-9]+$/.test(inputs.account)) {
        newErrors.account = "Enter a valid account number";
        isValid = false;
      }
    }

    // Organization Name validation (only if organization is not 'Sutherlands')
    if (inputs.organization !== "Sutherlands") {
      if (!("organizationName" in inputs) || inputs.organizationName.trim() === "") {
        newErrors.organizationName = "Enter your organization name";
        isValid = false;
      } else if ("organizationName" in inputs && !/^[a-zA-Z\s]+$/.test(inputs.organizationName.trim())) {
        newErrors.organizationName = "Organization name should only contain letters";
        isValid = false;
      }
    }

    // Email validation
    if (!("email" in inputs) || inputs.email.trim() === "") {
      newErrors.email = "Enter your Email";
      isValid = false;
    } else if ("email" in inputs && !/^[^\s@]+@[^\s@]+\.[^s@]{2,3}$/.test(inputs.email)) {
      newErrors.email = "Enter a valid Email";
      isValid = false;
    }

    // Phone Number validation
    if ("phoneNumber" in inputs && !/^\d{10}$/.test(inputs.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Phone Number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInputs()) {
      setIsFormSubmitted(true);

      setOrganization(inputs.organization === 'Sutherlands' ? 'Sutherlands' : inputs.organizationName);
      // Navigate to the questions page after form submission
      navigate('/questions');
    } else {
      setIsFormSubmitted(false);
    }
  };

  const navigate = useNavigate();

  
  return (
    <div className='myForm-Container'>
      <form onSubmit={handleSubmit}>
        {/* <div className='form-Row'>
          <label className='form-Label'>Name:</label>
          <input
            className='form-Input'
            type='text'
            name='userName'
            value={inputs.userName || ''}
            onChange={handleEventChange}
          />
          <div className='error-message'>{errors.userName}</div>
        </div> */}

        
          <div className="form-Row">
            <label className="form-Label">Organization: </label>
            <select
              className="form-Input"
              name="organization"
              value={inputs.organization}
              onChange={handleEventChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Sutherlands">Sutherlands</option>
              <option value="Other">Others</option>
            </select>
            <div className="error-message">{errors.organization}</div>
            <br />
          </div>

          {/* Render account or organization name input field based on the organization */}
          {inputs.organization === 'Sutherlands' ? (
            <div className='form-Row'>
              <label className='form-Label'>Account:</label>
              <input
                className='form-Input'
                type='text'
                name='account'
                value={inputs.account || ''}
                onChange={handleEventChange}
              />
              <div className='error-message'>{errors.account}</div>
            </div>
          ) : (
            <div className='form-Row'>
              <label className='form-Label'>Organization Name:</label>
              <input
                className='form-Input'
                type='text'
                name='organizationName'
                value={inputs.organizationName || ''}
                onChange={handleEventChange}
              />
              <div className='error-message'>{errors.organizationName}</div>
            </div>
          )}


        {/* Render email input field */}
        <div className='form-Row'>
          <label className='form-Label'>Email:</label>
          <input
            className='form-Input'
            type='email'
            name='email'
            value={inputs.email || ''}
            onChange={handleEventChange}
          />
          <div className='error-message'>{errors.email}</div>
        </div>

        {/* Render phone number input field */}
        <div className='form-Row'>
          <label className='form-Label'>Phone Number:</label>
          <input
            className='form-Input'
            type='number'
            name='phoneNumber'
            value={inputs.phoneNumber || ''}
            onChange={handleEventChange}
          />
          <div className='error-message'>{errors.phoneNumber}</div>
        </div>

        <div className='submit-btn-container'>
          <button className='Submit-btn' type='submit' onClick={handleSubmit}>
            Submit
          </button>
          <br />
          {isFormSubmitted && <p>Form submitted successfully!</p>}
        </div>
      </form>
    </div>
  );
};

export default Homepage;
