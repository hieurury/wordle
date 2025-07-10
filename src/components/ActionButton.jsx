import { Link } from "react-router-dom";

export default function ActionButton({title, link}) {
    return (
        <Link 
            className='flex justify-center items-center cursor-pointer space-x-2 my-4 px-4 py-2 rounded-md bg-orange-700 shadow-md active:translate-y-0.5 active:shadow-none shadow-orange-800 transition-shadow duration-100'
            to={link}
        >
            <span className="text-xl font-bold text-slate-100 tracking-wider">{title}</span>
            <span className="text-xl text-slate-200"><i className="fa-solid fa-play"></i></span>
        </Link>
    );
}