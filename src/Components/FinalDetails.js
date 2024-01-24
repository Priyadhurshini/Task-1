import React from 'react'
import { useState } from 'react'

const FinalDetails = () => {

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

        if (!("processName" in inputs) || inputs.processName.trim() === "" )
        {        
          newErrors.processName  = "Enter the Process Name"
          isValid = false;
        }

        if (!("minDocProcessed" in inputs) || !/^\d+$/.test(inputs.minDocProcessed.trim())) {
          newErrors.minDocProcessed = "Enter a Valid Number";
          isValid = false;
        }
      
        if ("avgPagePerDoc" in inputs && !/^\d+$/.test(inputs.avgPagePerDoc.trim())) {
          newErrors.avgPagePerDoc = "Enter a Valid Number";
          isValid = false;
        }
      
        if ("minCommitment" in inputs && !/^\d+$/.test(inputs.minCommitment.trim())) {
          newErrors.minCommitment = "Enter a Valid Number";
          isValid = false;
        }
       

        setErrors(newErrors);
        return isValid;
    } 

    const handleSubmit = (event) =>{
    event.preventDefault(event)
    if(validateInputs()){
        alert("Form submitted")
        setIsFromSumbited(true)
      }
      else{
        alert("Form has errors.Please correct them")
        setIsFromSumbited(false)
        
        
      }
    }


  return (
    <div className='final-details-container'>
        <form>
        <div className='form-Row'>
        <label className='form-Label'>Name of the process : </label>
        <input className='form-Input'  type='text'
                name = "processName"
                value = {inputs.name}
                onChange={handleEventChange}></input>
        </div>

        <div className='form-Row'>
        <label className='form-Label'>Estimated Minimum Monthly Documents Processed: </label>
        <input className='form-Input'  type='number'
                name = "minDocProcessed"
                value = {inputs.name}
                onChange={handleEventChange}></input>
        </div>

        <div className='form-Row'>
        <label className='form-Label'>Average Number of Pages per Document:	</label>
        <input className='form-Input'  type='number'
                name = "avgPagePerDoc"
                value = {inputs.name}
                onChange={handleEventChange}></input>
        </div>

        <div className='form-Row'>
        <label className='form-Label'>Minimum Commitment for Automation (in years): </label>
        <input className='form-Input'  type='number'
                name = "minCommitment"
                value = {inputs.name}
                onChange={handleEventChange}></input>
        </div>

        <button className='Submit-btn' type="submit"
                onClick={handleSubmit}>Submit</button>

        </form>
 
    </div>
  )
}

export default FinalDetails
