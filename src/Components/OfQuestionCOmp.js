import React, { useState } from "react";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";

const QuestionComponent = () => {

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [displayQuestionNumber, setDisplayQuestionNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); 
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


  return (
    <div className="Question-Container">
      {currentQuestion < questions.length ? (
        <>
          <p>{`${'Qn.No: '}${questions[currentQuestion].questionNumber}`}</p>
          <p className="single-question">{questions[currentQuestion].question}</p>        
          {/* <p>
          {currentQuestion === 2 ? (
            <label className="option-list">
              <select
                value={selectedChoice || ""}
                onChange={(e) => handleSelectedChoice(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                {questions[currentQuestion].choices.map((choice, index) => (
                  <option key={index} value={choice.text}>
                    {`${choice.text} - Price: $${choice.price}`}
                    
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
                  {`${choice.text} - Price: $${choice.price}`}
                </li>
              </label>
            ))
          )}
        </p> */}

// Your Render Component

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
          {`${choice.text}`}
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
          <p>Quiz is Done</p>
          <p>Total Price: ${totalPrice}</p>
          <button 
            type="button"
            onClick={()=>navigate("/finaldetails")}
            >
              Next</button>
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;
