import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./HomepageComponentStyle.css"

const Homepage = () => {

  const [inputs, setInputs] = useState({})
  const [errors,setErrors] = useState({})
  const [isFormSubmited, setIsFromSumbited] = useState(false)

  const handleEventChange =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
    
    // alert(name)
    // alert(value)
  }
  
  const validateInputs = () =>{

    let isValid = true;
    const newErrors = {};
    alert("0")
    // alert(inputs.userName)
    // alert( JSON.stringify(inputs, null, 2));

    //  start of user name validation
    if (!("userName" in inputs) || inputs.userName.trim() === "" )
    {
      alert("1")
      newErrors.name  = "Enter a Name"
      isValid = false;
    }

    else if ( "userName" in inputs && !/^[a-zA-Z\s]+$/.test(inputs.userName.trim()))
    {
      alert("3")
      newErrors.name  = "Name should only contain letters"
      isValid = false;
    }
    // End of user name validation

    // Start of age validation

    if (!("age" in inputs))
    {
      alert("age empty")
      newErrors.age  = "Enter your age"
      isValid = false;
    }

    else if("age" in inputs && !/^\d{2}$/.test(inputs.age))
    {
      newErrors.age  = "Enter a valid age"
      isValid = false;
    }
    // End of age validation

    // Start of email validation

    if (!("email" in inputs) || inputs.email.trim() === "")
    {
      alert("email empty")
      newErrors.email  = "Enter your Email"
      isValid = false;
    }

    else if("email" in inputs && !/^[^\s@]+@[^\s@]+\.[^s@]{2,3}$/.test(inputs.email))
    {
      newErrors.email  = "Enter a valid Email"
      isValid = false;
    }
    // End of email Validation

    // Start of phone number validation
    if (!("phoneNumber" in inputs))
    {
      alert("phoneNumber empty")
      newErrors.phoneNumber  = "Enter your Phone Number"
      isValid = false;
    }

    else if("phoneNumber" in inputs && !/^\d{10}$/.test(inputs.phoneNumber))
    {
      newErrors.phoneNumber  = "Enter a valid Phone Number"
      isValid = false;
    }
    // End of phone number validation
    setErrors(newErrors);
    return isValid;
  }  

    
  const handleSubmit = (event) =>{
    event.preventDefault(event)
    // alert(inputs.value)

    if(validateInputs()){
      alert("Form submitted")
      alert(inputs.userName)
      setIsFromSumbited(true)
    }
    else{
      alert("Form has errors.Please correct them")
      setIsFromSumbited(false)
      
      // alert( JSON.stringify(errors, null, 2));
    }
    alert(errors.name)
}
const navigate = useNavigate()


  return (
    <div className='myForm-Container'>
      <form onSubmit={handleSubmit}>
        <p>{(JSON.stringify(errors, null, 2))}</p>
        <label>Name : </label>
        <input  type='text'
                name = "userName"
                value = {inputs.name}
                onChange={handleEventChange}></input><span>{errors.name}</span><br></br>
                                              

        <label>Age : </label>
        <input  type="number"
                name = "age"                
                value ={inputs.age}
                onChange={handleEventChange}></input><span>{errors.age}</span><br></br>   

        <label>Email : </label>
        <input  type="email"
                name = "email"                
                value ={inputs.email}
                onChange={handleEventChange}></input><span>{errors.email}</span><br></br>   

        <label>Phone Number : </label>
        <input  type="number"
                name = "phoneNumber"                
                value ={inputs.phone}
                onChange={handleEventChange}></input><span>{errors.phoneNumber}</span><br></br> 

        <button className='Submit-btn' type="submit"
                onClick={handleSubmit}>Submit</button><br></br>

        <button className='Nextpage-btn' 
                disabled  = {isFormSubmited === false}
                onClick={()=>navigate("/questions")}>Question button</button>
      </form>
      
      
    </div>
  )
}

export default Homepage
