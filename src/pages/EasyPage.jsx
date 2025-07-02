import { useState, useEffect } from 'react'
import ListInput from '../components/ListInput'
import ListResult from '../components/ListResult'
import questionsData from '../data/questions.json'

const PAGE_LEVEL = 'easy';

function EasyPage() {
  //lấy dữ liệu từ JSON
  const [levelData, setLevelData] = useState([]);
  const [odQuestions, setOdQuestions] = useState([]);
  const [fullValueQuestions, setFullValueQuestions] = useState([]);
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
  const [clearInput, setClearInput]         = useState(false);
  const [currentTurns, setCurrentTurns]     = useState(null);

  
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

    if(clearInput) {
      setClearInput(false);
    }
  }, [response]);
  
  function resetGame() {
    setResponse([]);
    setAnswer([]);
    setSubmit(false);
    setGameResult(false);
    setGameWin(false);
    
    // Chọn câu hỏi mới
    if (levelData.length > 0) {
      randomQuestion(levelData);
    }
    
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
      setFullValueQuestions(selectedQuestion);
      setOdQuestions([...odQuestions, selectedQuestion]);
      setQuestion(selectedQuestion.question.split(''));
    }
  }


  return (
      <div className='flex flex-col items-center bg-slate-800 p-12'>
        <h1 className='uppercase text-4xl text-slate-500 font-bold my-8'>Wordle rury</h1>
        <div className="mb-6 text-center">
          <h1 className='text-xl text-slate-400'>Chủ đề: {fullValueQuestions.key}</h1>
            <ListInput 
              data={question} 
              response={(data) => {
                setResponse(data)
              }} 
              clearInput={clearInput}
            />
            
            <button 
              className={
                `mt-4 px-4 py-2 text-white rounded cursor-pointer relative
                  ${submit ? 'bg-green-600' : 'bg-gray-600 pointer-events-none'}
                `
              }
              onClick={() => {
                const newAnswer = response;
                setAnswer([...answer, newAnswer]);
                setClearInput(true);
              }}
              disabled={!submit}
            >Chắc đúng rồi 
            <span className='
              absolute w-4 h-4 flex justify-center items-center text-sm -top-2 -right-2 bg-orange-700 rounded-full
              '>{currentTurns}
            </span>
            </button>
            
            <div className='border-2 border-slate-600 bg-slate-900 p-4 mt-4 w-full max-w-md'>
              <ListResult 
                answers={answer} 
                question={question} 
                response={(value) => {
                  setGameResult(true);
                  setGameWin(value);
                }}
                responseTurns={(turns) => {
                  setCurrentTurns(turns);
                }}
              />
            </div>
      </div>
    </div>
    
  )
}

export default EasyPage
