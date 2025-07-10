import { Link } from "react-router-dom";

export default function ModalTotal({ isOpen, data, action}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <button className="bg-white p-2 rounded font-bold flex justify-center items-center space-x-2    " onClick={action}>
                        <i class="fa-solid fa-arrow-rotate-left"></i>
                        <span>Chơi lại</span>
                    </button>
                    <Link className="flex space-x-2 justify-center items-center bg-white p-2 rounded font-bold" onClick={action} to="/">
                        <i class="fa-solid fa-house"></i>
                        <span>Về trang chủ</span>   
                    </Link>
                </div>
            </div>
        </div>
    )

}