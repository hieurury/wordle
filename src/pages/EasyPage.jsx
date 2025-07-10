import { useState, useEffect } from 'react'
import ListInput from '../components/ListInput'
import ListResult from '../components/ListResult'
import questionsData from '../data/questions.json'

const PAGE_LEVEL = 'easy';
const MAX_QUESTIONS = 10;

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
  const [questionsPlayed, setQuestionsPlayed] = useState(new Array(MAX_QUESTIONS).fill({}));

  
  useEffect(() => {
    let nearQuestion = {};

    if(gameWin && gameResult) {
      nearQuestion = {...odQuestions[odQuestions.length - 1], status: 1};
      resetGame();
    } else if(gameResult && !gameWin) {
      nearQuestion = {...odQuestions[odQuestions.length - 1], status: 0};
      resetGame();
    }
    //tim object rỗng đầu tiên trong mảng questionsPlayed
    const emptyIndex = questionsPlayed.findIndex(item => Object.keys(item).length === 0);

    //cập nhật lại câu hỏi đã chơi
    const newQuestionsPlayed = [...questionsPlayed];
    newQuestionsPlayed[emptyIndex] = nearQuestion;
    setQuestionsPlayed(newQuestionsPlayed);

  }, [gameResult]);

  //reset lại màn chơi khi questionPlayed đầy
  useEffect(() => {
    const emptyIndex = questionsPlayed.findIndex(item => Object.keys(item).length === 0);
    if(emptyIndex === -1) {
      setQuestionsPlayed(new Array(MAX_QUESTIONS).fill({}));
    }
  }, [questionsPlayed]);

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

  // useEffect(() => {
  //   if(odQuestions && odQuestions.length >= MAX_QUESTIONS) {
  //     resetGame();
  //   }
  // }, [odQuestions]);

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

  function bgHandler(item) {
    if(item.status === undefined) return 'bg-gray-200 dark:bg-slate-700';
    if(item.status === 1) return 'bg-[url(/images/correct.png)]';
    if(item.status === 0) return 'bg-[url(/images/wrong.png)]';
  }

  function valueHandler(item) {
    if(item.status === undefined) return '?';
    return item.question;
  }



  return (
      <div className='grid lg:grid-cols-3 grid-cols-1 dark:bg-slate-800 bg-white min-h-screen'>
        <div className="mb-6 text-center py-12 px-4 col-span-2">
          <h1 className='uppercase text-6xl p-2 text-slate-700 dar:text-slate-500 font-bold'>wordle rury</h1>
          <h1 className='text-xl italic font-bold my-4 text-sky-600'>Chủ đề: {fullValueQuestions.key}</h1>
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
            
            <div className='flex justify-center items-center border-t-2 border-slate-200 bg-transparent p-4 mt-4 w-full'>
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
        <div className='dark:bg-slate-900 bg-white border-l-2 border-slate-600 p-6'>
          <h1 className='text-2xl uppercase font-bold dark:text-slate-600'>Giai đoạn</h1>
          <ul className='grid grid-cols-5 gap-2'>
            {questionsPlayed.map((item, index) => (
              <li 
                key={index} 
                className={`flex justify-center items-center p-2 text-slate-400 text-md bg-cover rounded-lg bg-no-repeat shadow-md
                  ${bgHandler(item)}
                `}
              >
                <span className='flex justify-center items-center text-md italic text-white'>{valueHandler(item)}</span>
              </li>
            ))}
          </ul>
        </div>
    </div>
    
  )
}

export default EasyPage
