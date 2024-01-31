// use this
import React, { useState } from "react";
import Questions from "./Questions";
import FinalDetails from "./FinalDetails";
// import { useNavigate } from "react-router-dom";

const QuestionComponent = () => {

 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [displayQuestionNumber, setDisplayQuestionNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // New state for answered questions
  const { questions } = Questions;

  const handleSelectedChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const setPreviousQuestionAndChoice = (diff) => {
    setCurrentQuestion(currentQuestion - diff);
    setSelectedChoice(questions[currentQuestion - diff].choice);
  };

  const handleNextQuestion = () => {
    questions[currentQuestion].choice = selectedChoice;

    // Calculate price for the current question's choice
    const currentChoice = questions[currentQuestion].choices.find(
      (choice) => choice.text === selectedChoice
    );
    const choicePrice = currentChoice ? currentChoice.price : 0;

    // Update total price based on the current question's choice
    setTotalPrice((prevTotalPrice) => prevTotalPrice + choicePrice);

    if (
      currentQuestion > 0 &&
      questions[currentQuestion].dependentQuestion > 0 &&
      questions[currentQuestion].dependentChoice ===
        questions[questions[currentQuestion].dependentQuestion - 1].choice
    ) {
      setCurrentQuestion(currentQuestion + 2);
    } else if (
      selectedChoice != null &&
      selectedChoice.trim() === questions[currentQuestion].choiceCondition
    ) {
      setCurrentQuestion(currentQuestion + 2);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedChoice(null);
    setDisplayQuestionNumber(displayQuestionNumber + 1);

    setAnsweredQuestions((prevAnswers) => [
      ...prevAnswers,
      {
        questionNumber: questions[currentQuestion].questionNumber,
        selectedChoice: selectedChoice,
        selectedPrice: choicePrice,
      },
    ]);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      if (questions[currentQuestion - 1].choice != null) {
        setPreviousQuestionAndChoice(1);
      } else {
        setPreviousQuestionAndChoice(2);
      }
    }
    setDisplayQuestionNumber(displayQuestionNumber - 1);
  };
  // console.log(answeredQuestions)




  return (
    <div className="Question-Container">
      {currentQuestion < questions.length ? (
        <>
          <p>{`${'Qn.No: '}${questions[currentQuestion].questionNumber}`}</p>
          <p className="single-question">{questions[currentQuestion].question}</p>        
          <p>
          {currentQuestion === 2 ? (
            <label className="option-list">
              <select
                value={selectedChoice || ""}
                onChange={(e) => handleSelectedChoice(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                {questions[currentQuestion].choices.map((choice, index) => (
                  <option key={index} value={choice.text}>
                    {choice.text}
                    
                  </option>
                ))}
              </select>
            </label>
          ) : (
            questions[currentQuestion].choices.map((choice, index) => (
              <label key={index} className="option-list">
                <li>
                  <input
                    type="radio"
                    id={choice.text}
                    value={choice.text}
                    checked={selectedChoice === choice.text}
                    onChange={() => handleSelectedChoice(choice.text)}
                  />
                  {/* {`${choice.text} - Price: $${choice.price}`} */}
                  {choice.text}
                  {/* - <strong>Price: ${choice.price}</strong> */}
                </li>
              </label>
            ))
          )}
        </p>
          <div className="Question-next-btn">
            <button
              className="Previous-Question-btn"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion <= 0}
            >
              Back
            </button>

            <button
              className="Next-Question-btn"
              onClick={handleNextQuestion}
              disabled={selectedChoice === null}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div>
          <FinalDetails answeredQuestions={answeredQuestions}></FinalDetails>
          {/* <p>Total Price: ${totalPrice}</p> */}
        </div>        
      )}
    </div>
  );
};

export default QuestionComponent;
