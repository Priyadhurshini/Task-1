import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './Components/Homepage';
import QuestionComponent from './Components/QuestionsComponent';


function App() {

return (
  
<div className="App"> 
{/* <Homepage></Homepage> */}
     {/* <QuestionComponent></QuestionComponent> */}
     
  <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Homepage></Homepage>}></Route>
      <Route path ="/questions" element = {<QuestionComponent></QuestionComponent>}></Route>
    </Routes>        
  </BrowserRouter>
</div>
  
  
)
}

export default App;