import { useState, useEffect } from 'react';

export default function ListResult({answers, question, response, responseTurns}) {
    const items = answers;
    const [turns, setTurns] = useState();
    
    useEffect(() => {
        if(items.length === 0) setTurns(initTurnGame(question));
        checkWin();
        if(items.length > 0) {
            setTurns(turns - 1);
        }
    }, [items]);

    useEffect(() => {
        if(turns === 0) {
            response(false);
        }
        responseTurns(turns);
    }, [turns]);

    function checkIndex(index, item) {
        if(question[index] == item) return 'bg-green-600 animate-pulse';
        if(question.includes(item)) return 'bg-orange-400';
        else return 'bg-red-600';
    }

    function checkWin() {
        if(items.length === 0) return;
        const result = items[items.length - 1].map((item, index) => {
            if(item === question[index]) {
                return 1;
            } else if(question.includes(item)) {
                return -1;
            } else {
                return 0;
            }
        });
        if(!result.includes(-1) && !result.includes(0)) {
            response(true);
        }
    }

    function initTurnGame(question) {
        switch (true) {
            case question.length <= 4:
                return 5;
            case question.length <= 7:
                return 7;
            default:
                return 9;
        }
    }

    if(items.length === 0) {
        return (
            <h1 className='text-xl text-slate-500'>Chúc may mắn 🍀</h1>
        )
    }

    return (
        <>
            <div className=''>
                {items.map((items, index) => {
                    return (
                        <ul 
                            className="flex"
                            key={index}>
                            {items.map((child, index) => {
                                return (
                                    <li
                                        className={`flex justify-center items-center m-1 text-2xl uppercase rounded w-12 h-12 text-white
                                        ${checkIndex(index, child)}`}
                                        key={index}
                                        data-answer={checkIndex(index, child)}
                                    >{child}</li>
                                )
                            })}
                        </ul>
                    )
                })}
            </div>
        </>
    )
}