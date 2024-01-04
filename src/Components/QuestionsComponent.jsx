import React from "react";
import "./QuestionComponentStyle.css"
import { useState } from "react";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";

const QuestionComponent = () =>{

    const navigate = useNavigate()

    const [currentQuestion, setCurrentQuestion] = useState (0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [displayQuestionNumber, setDisplayQUestionNumber] = useState(1);
    
    const {questions} = Questions;
    const {questionNumber, question, choices, choice, choiceCondition, dependentQuestion, dependentChoice} = questions;

    const handleSelectedChoice = (choice) =>
    {
      setSelectedChoice(choice)
    }

    const setPreviousQuestionAndChoice = (diff) =>{
      setCurrentQuestion(currentQuestion - diff)
      setSelectedChoice(questions[currentQuestion - diff].choice)
    }

    const handleNextQuestion = () =>
    {
      questions[currentQuestion].choice = selectedChoice;

      if( currentQuestion > 0 && questions[currentQuestion].dependentQuestion > 0 && 
        questions[currentQuestion].dependentChoice === questions[questions[currentQuestion].dependentQuestion - 1].choice )
        {
          setCurrentQuestion(currentQuestion + 2)
          alert("inside if")
        }

      else if( selectedChoice != null && selectedChoice.trim() === questions[currentQuestion].choiceCondition )
          {
            setCurrentQuestion(currentQuestion + 2)
          }  

      else{
            setCurrentQuestion(currentQuestion + 1)
          }      
      setSelectedChoice(null)
      
      setDisplayQUestionNumber(displayQuestionNumber + 1)

    }

    const handlePreviousQuestion =() =>{

      alert(questions[currentQuestion].choiceCondition)

      if (currentQuestion > 0 )
      {
        if(questions[currentQuestion - 1].choice != null)
        {
          setPreviousQuestionAndChoice (1)
        }
        else
        {
          setPreviousQuestionAndChoice (2)
        }
      } 
      setDisplayQUestionNumber(displayQuestionNumber - 1)      
    }
    
    
        
return (
  <div className="Question-Component-Container">
    
    { currentQuestion < questions.length ?(
    <>
     <p>{displayQuestionNumber}</p>
     <p>{questions[currentQuestion].questionNumber}</p>
     <p>{questions[currentQuestion].question}</p>
     
     <p>
       {questions[currentQuestion].choices.map((choice, index) => (
         <label key={index}>
           <li>
             <input
               type="radio"
               id={choice}
               value={choice}
               checked={selectedChoice === choice}
               onChange={() => handleSelectedChoice(choice)}
             />
             {choice}
           </li>
         </label>
       ))}
     </p> 
     <div className="Question-Component-btn-container">
      <button className="Next-Question-btn" onClick={handlePreviousQuestion}
              disabled = {currentQuestion <= 0}>Previous</button>   

     <button className="Previous-Question_btn" onClick={handleNextQuestion}
            disabled = {selectedChoice === null}>Next</button> </div>
     </>)

    :

    (
      <div>
        <p>Quiz is Done</p>
      </div>
    )}
    
  </div>
)
}

export default QuestionComponent;