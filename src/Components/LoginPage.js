// use this
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
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

    if (!(inputs.userid) || inputs.userid.trim() === "") {
      newErrors.userid = "Enter your User id";
      isValid = false;
    }

    if (!(inputs.password) || inputs.password.trim() === "") {
      newErrors.password = "Enter your password";
      isValid = false;
    }

    if (!(inputs.confirmPassword) || inputs.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm your password";
      isValid = false;
    } else if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      // alert("Form submitted");
      setIsFormSubmitted(true);
      navigate('/homepage')
    } else {
      alert("Form has errors. Please correct them");
      setIsFormSubmitted(false);
    }
  };

  return (
    <div className='login-form-container'>
      <form>
        <div className='form-Row'>
          <label className='form-Label'>User id: </label>
          <input
            className='form-Input'
            type='text'
            name='userid'
            value={inputs.userid || ''}
            onChange={handleEventChange}
          />
          {errors.userid && <div className='error-message'>{errors.userid}</div>}
        </div>

        <div className='form-Row'>
          <label className='form-Label'>Password: </label>
          <input
            className='form-Input'
            type='password'
            name='password'
            value={inputs.password || ''}
            onChange={handleEventChange}
          />
          {errors.password && <div className='error-message'>{errors.password}</div>}
        </div>

        <div className='form-Row'>
          <label className='form-Label'>Confirm Password: </label>
          <input
            className='form-Input'
            type='password'
            name='confirmPassword'
            value={inputs.confirmPassword || ''}
            onChange={handleEventChange}
          />
          {errors.confirmPassword && <div className='error-message'>{errors.confirmPassword}</div>}
        </div>

        <div className='done-btn-container'>
        <button className='Submit-btn' type='submit' onClick={handleSubmit}>
          Log in
        </button>
        </div>
      </form>

    </div>
  );
};

export default LoginPage;
