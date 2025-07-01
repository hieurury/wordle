import { useState, useEffect } from 'react'
import ListInput from '../components/ListInput'
import ListResult from '../components/ListResult'
import questionsData from '../data/questions.json'

const PAGE_LEVEL = 'easy';

function EasyPage() {
  //lấy dữ liệu từ JSON
  const [levelData, setLevelData] = useState([]);
  const [odQuestions, setOdQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  
  // Load dữ liệu khi component mount
  useEffect(() => {
    const data = questionsData[PAGE_LEVEL];
    if (data && data.data) {
      setLevelData(data.data);
      randomQuestion(data.data)
    }
  }, []);

  const [submit, setSubmit]                 = useState(false)
  const [response, setResponse]             = useState([])
  const [answer, setAnswer]                 = useState([])
  const [gameResult, setGameResult]         = useState(false);
  const [gameWin, setGameWin]               = useState(false);
  const [resetTrigger, setResetTrigger]     = useState(false);
  const [clearInput, setClearInput]         = useState(false);

  
  useEffect(() => {
    if(gameWin && gameResult) {
      alert('You win!');
      resetGame();
    } else if(gameResult && !gameWin) {
      alert('You lose!');
      resetGame();
    }
  }, [gameResult]);

  useEffect(() => {
    if(response.length > 0 && !response.includes(undefined) && !response.includes('') && response.length === question.length) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [response]);
  
  function resetGame() {
    setResponse([]);
    setAnswer([]);
    setSubmit(false);
    setGameResult(false);
    setGameWin(false);
    setResetTrigger(true);
    
    // Chọn câu hỏi mới
    if (levelData.length > 0) {
      randomQuestion(levelData);
    }
    
    // Reset trigger sau một khoảng thời gian ngắn
    setTimeout(() => setResetTrigger(false), 100);
  }


  function randomQuestion(data) {
    if(odQuestions && odQuestions.length == data.length) {
        //có nghĩa là đã hết câu hỏi
        //reset
        setOdQuestions(null);
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedQuestion = data[randomIndex];
    if(odQuestions.includes(selectedQuestion)) {
      // Nếu câu hỏi đã được chọn, gọi lại hàm để chọn câu hỏi khác
      randomQuestion(data);
    } else {
      setOdQuestions([...odQuestions, selectedQuestion]);
      setQuestion(selectedQuestion.question.split(''));
    }
  }


  return (
      <div className='flex flex-col items-center min-h-screen bg-slate-800 p-12'>
        <div className="mb-6 text-center">
            <ListInput 
              data={question} 
              response={(data) => {
                setResponse(data)
              }} 
              resetTrigger={resetTrigger}
            />
            
            <button 
              className={`
              mt-4 px-4 py-2 text-white rounded cursor-pointer ${submit ? 'bg-green-600' : 'bg-gray-600 pointer-events-none'}`}
              onClick={() => {
                const newAnswer = response;
                setAnswer([...answer, newAnswer]);
              }}
              disabled={!submit}
            >Submit</button>
            
            <ListResult 
              answers={answer} 
              question={question} 
              response={(value) => {
                setGameResult(true);
                setGameWin(value);
              }}
            />
      </div>
    </div>
    
  )
}

export default EasyPage
