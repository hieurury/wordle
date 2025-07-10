import { useState } from "react";


export default function ToggleTheme({ toggleTheme }) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        toggleTheme();
    }

    // Thêm class cho body để thay đổi giao diện
    if (isDarkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }

  return (
    <button 
      className='flex space-x-2 justify-center items-center px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-300'
      onClick={handleToggle}
    >
    <i className={`fa-solid fa-${isDarkMode ? 'moon' : 'sun'} dark:text-slate-300 text-slate-700`}></i>
      <span className="dark:text-slate-300 text-slate-700">{isDarkMode ? 'Tối' : 'Sáng'}</span>
    </button>
  );
}