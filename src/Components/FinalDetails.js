// use this
import React, { useState, useEffect } from 'react';
import { Breakdown } from './Breakdown';

const FinalDetails = ({ answeredQuestions }) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [finalCalculatedValue, setFinalCalculatedValue] = useState(0);
  const [questions567TotalValue, setQuestions567TotalValue] = useState(0);
  const [questions13141617TotalValue, setQuestions13141617TotalValue] = useState(0);
  
  const handleEventChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };
  useEffect(() => {
    if (isFormSubmitted) {
      // Calculate the total price when answeredQuestions or input values change
      let modifiedTotalPrice = answeredQuestions.reduce((accumulator, answer) => {
        let priceToAdd = answer.selectedPrice;
  
        // Apply additional logic for questions 5, 6, and 7
        if (answer.questionNumber >= 5 && answer.questionNumber <= 7) {
          priceToAdd *= parseInt(inputs.avgPagePerDoc) || 0;
        }
  
        // Apply additional logic for questions 13, 14, 16, and 17
        if ([13, 14, 16, 17].includes(answer.questionNumber)) {
          priceToAdd *= 12 * (parseInt(inputs.minCommitment) || 0);
        }
  
        return accumulator + priceToAdd;
      }, 0);
  
      // Set the state variable with the calculated total price
      setFinalCalculatedValue(modifiedTotalPrice);

    }
  }, [isFormSubmitted, answeredQuestions, inputs.avgPagePerDoc, inputs.minCommitment]);
  
  // Calculate the total for questions 5, 6, and 7 separately
  useEffect(() => {
    if (isFormSubmitted) {
      const questions567 = answeredQuestions
        .filter(answer => answer.questionNumber >= 5 && answer.questionNumber <= 7)
        .reduce((accumulator, answer) => accumulator + answer.selectedPrice, 0);
  
      // Apply discount based on the value of averagePages only to questions 5, 6, and 7 total
      let discountedQuestions567Total = questions567;
      if (parseInt(inputs.avgPagePerDoc) > 100000 && parseInt(inputs.avgPagePerDoc) <= 500000) {
        // 5% discount
        discountedQuestions567Total *= 0.95;
      } else if (parseInt(inputs.avgPagePerDoc) > 500000 && parseInt(inputs.avgPagePerDoc) <= 1000000) {
        // 10% discount
        discountedQuestions567Total *= 0.9;
      } else if (parseInt(inputs.avgPagePerDoc) > 1000000) {
        // 15% discount
        discountedQuestions567Total *= 0.85;
      }
  
      // Set the state variable with the calculated total for questions 5, 6, and 7
      setQuestions567TotalValue(discountedQuestions567Total);
    }
  }, [isFormSubmitted, answeredQuestions, inputs.avgPagePerDoc]);
  
  // Calculate the total for questions 13, 14, 16, and 17 separately
  useEffect(() => {
    if (isFormSubmitted) {
      const questions13141617 = answeredQuestions
        .filter(answer => [13, 14, 16, 17].includes(answer.questionNumber))
        .reduce((accumulator, answer) => accumulator + answer.selectedPrice, 0);
  
      // Set the state variable with the calculated total for questions 13, 14, 16, and 17
      setQuestions13141617TotalValue(questions13141617);
    }
  }, [isFormSubmitted,  answeredQuestions, inputs.minCommitment]);
  
  
  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    // Example validation for the "processName" field
    if (!("processName" in inputs) || inputs.processName.trim() === "") {
      newErrors.processName = "Enter the Process Name";
      isValid = false;
    }

    if (!("minDocProcessed" in inputs) || inputs.minDocProcessed.trim() === "") {
      newErrors.minDocProcessed = "Enter a Valid Number";
      isValid = false;
    }

    if (!("avgPagePerDoc" in inputs) || inputs.avgPagePerDoc.trim() === "") {
      newErrors.avgPagePerDoc = "Enter a Valid Number";
      isValid = false;
    }

    if (!("minCommitment" in inputs) || inputs.minCommitment.trim() === "") {
      newErrors.minCommitment = "Enter a Valid Number";
      isValid = false;
    }

    // Add similar validations for other fields as needed

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      setIsFormSubmitted(true);
      alert("Form submitted");
    } else {
      setIsFormSubmitted(false);
      alert("Form has errors. Please correct them");
    }
  };

  return (
    <div >
    {isFormSubmitted ? (
      <div>
        {/* <p style={{fontWeight: 'bold', textAlign : 'center'}}>Total Price: ${finalCalculatedValue}</p> */}
        <Breakdown 
          meteringAsYouGo = {questions567TotalValue}
          fixedRecurring = {questions13141617TotalValue}
          totalPrice = {finalCalculatedValue}
          processName= {inputs.processName}
          monthlyDoc = {inputs.minDocProcessed}
          yearOfCommitment = {inputs.minCommitment}>
        </Breakdown>
   
      </div>
    ):
    (
      <div className='final-details-container'>
      <form>
        <div className='form-Row'>
          <label className='form-Label'>Name of the process : </label>
          <input
            className='form-Input'
            type='text'
            name='processName'
            value={inputs.processName || ''}
            onChange={handleEventChange}
          />
          {errors.processName && (
            <span className='error-message'>{errors.processName}</span>
          )}
        </div>

        <div className='form-Row'>
          <label className='form-Label'>
            Estimated Minimum Monthly Documents Processed:{' '}
          </label>
          <input
            className='form-Input'
            type='number'
            name='minDocProcessed'
            value={inputs.minDocProcessed || ''}
            onChange={handleEventChange}
          />
        </div>

        <div className='form-Row'>
          <label className='form-Label'>
            Average Number of Pages per Document:{' '}
          </label>
          <input
            className='form-Input'
            type='number'
            name='avgPagePerDoc'
            value={inputs.avgPagePerDoc || ''}
            onChange={handleEventChange}
          />
        </div>

        <div className='form-Row'>
          <label className='form-Label'>
            Minimum Commitment for Automation (in years):{' '}
          </label>
          <input
            className='form-Input'
            type='number'
            name='minCommitment'
            value={inputs.minCommitment || ''}
            onChange={handleEventChange}
          />
        </div>

        {/* <h2>Total Price: ${totalPrice}</h2> */}
        <div className='done-btn-container'>
        <button className='Done-btn' type='submit' onClick={handleSubmit}>
          Done
        </button>
        </div>
      </form>
      </div>
    )}

    
     </div>
  );
};

export default FinalDetails;
