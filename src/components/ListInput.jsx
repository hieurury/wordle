import { useEffect, useState, useRef } from 'react';

export default function ListInput({ data, response, resetTrigger, clearInput }) {
    const [value, setValue] = useState([]);
    const [randomIndex, setRandomIndex] = useState([]);
    const inputsRef = useRef([]);

    //đảm bảo độ dài của value bằng data để tránh gặp lỗi khi response
    useEffect(() => {
        value.length = data.length;
    }, [data]);

    useEffect(() => {
        // Xóa giá trị của các input khi clearInput được gọi
        if(clearInput) {
            setValue([]);
            console.log(value);
        }
    }, [clearInput]);

    //trả giá trị cho component cha
    useEffect(() => {
        response(value);

        //tìm cái input rỗng từ trước ra sau để focus
        const firstEmptyInput = value.findIndex(item => item === '' || item === undefined);
        inputsRef.current[firstEmptyInput]?.focus();
    }, [value]);


    //cập nhật lại các gợi ý khi dữ liệu câu hỏi thay đổi
    useEffect(() => {
        const length = data.length;
        switch (true) {
            case length < 5:
                randomGenarator(1);
                break;
            case length < 8:
                randomGenarator(2);
                break;
            case length < 10:
                randomGenarator(3);
                break;
            default:
                randomGenarator(4);
                break;
        }
        function randomGenarator(len) {
            if(data.length === 0) return;
            if(randomIndex.length >= len) return;
            //tạo số ngẫu nhiên
            const randomNumber = Math.floor(Math.random() * data.length);
            //nếu số đó có rồi thì tạo lại
            if(randomIndex.includes(randomNumber)) {
                randomGenarator(len);
            } else {
                //nếu chưa có thì thêm vào mảng
                setRandomIndex([...randomIndex, randomNumber]);
                const newValue = [...value];
                newValue[randomNumber] = data[randomNumber];
                setValue(newValue);
            }
        }
    }, [data]);

    // Reset khi game kết thúc
    useEffect(() => {
        if (resetTrigger) {
            setValue([]);
            setRandomIndex([]);
        }
    }, [resetTrigger]);

    // function targetEmptyInput(currentInput) {
    //     if(value.includes('') || value.includes(undefined)) {
    //         console.log("ok");
    //     }
    // }

    return (
        <div>
        {data.map((input, index) => {
            return (
                <input 
                    ref={el => inputsRef.current[index] = el}
                    className="w-10 h-10 mx-1 caret-transparent uppercase text-center text-2xl bg-slate-700 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                    key={index}
                    maxLength={1}
                    onChange={(e) => {
                        const data = e.target.value;
                        const newValue = [...value];
                        newValue[index] = data;
                        setValue(newValue);
                        // targetEmptyInput(index);
                    }}
                    value={randomIndex.includes(index) ? input : (value[index] || '')}
                />
            )
        })}
        </div>
  )
}
