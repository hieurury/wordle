import { useEffect, useState, useRef } from 'react';

export default function ListInput({ data, response, clearInput }) {
    const [value, setValue] = useState([]);
    const [randomIndex, setRandomIndex] = useState([]);
    const inputsRef = useRef([]);

    useEffect(() => {
        // Xóa giá trị của các input khi clearInput được gọi
        if(clearInput) {
            //lấy lại value cũ
            const odValue = [...value];
            //lập qua toàn bộ mảng value, chỉ giữ lại những giá trị có trong ramdomIndex
            const newValue = odValue.map((item, index) => {
                return randomIndex.includes(index) ? item : '';
            });
            setValue(newValue);
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
        if(length == 0) return; //nếu không có dữ liệu câu hỏi thì không làm gì cả


        //tính các gợi ý dựa trên dữ liệu câu hỏi
        let hints = 4; //số hint tối đa
        if(length < 5) hints = 1;
        else if(length < 8) hints = 2;
        else if(length < 10) hints = 3;

        //khởi tạo các mảng gợi ý và dữ liệu nền
        const newRandomIndex = [];
        const newValue = new Array(length).fill(''); //khởi tạo mảng giá trị với độ dài bằng length và giá trị là rỗng
        console.log(data, newValue);
        while (newRandomIndex.length < hints) {
            const randomIndex = Math.floor(Math.random() * length);
            if (!newRandomIndex.includes(randomIndex)) {
                newRandomIndex.push(randomIndex);
                newValue[randomIndex] = data[randomIndex]; //gán giá trị gợi ý vào mảng value
            }
        }

        //cập nhật lại state
        setRandomIndex(newRandomIndex);
        setValue(newValue);

    }, [data]);


    return (
        <div>
        {data.map((input, index) => {
            return (
                <input 
                    ref={el => inputsRef.current[index] = el}
                    className="w-12 h-12 mx-1 caret-transparent uppercase text-center text-2xl dark:bg-slate-700 bg-transparent dark:text-white text-slate-800 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                    // value={input}
                />
            )
        })}
        </div>
  )
}
