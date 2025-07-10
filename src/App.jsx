import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import EasyPage from './pages/EasyPage';
import ToggleTheme from './components/ToggleTheme';

// Component con để sử dụng useLocation
function Navigation() {
  const location = useLocation();
  
  const locations = {
    '/': 'Trang chủ',
    '/easy': 'Cấp độ dễ',
    '/medium': 'Medium',
    '/hard': 'Hard'
  }

  return (
    <nav className='flex py-4 px-2 justify-between items-center shadow-md'>
      <div className='flex justify-center items-center space-x-1'>
        <div className='w-10 h-10 rounded-full overflow-hidden'>
          <img className='object-cover w-full h-full' src="/images/logo.png" alt="Logo" />
        </div>
        <h1 className='text-2xl uppercase text-slate-600 font-bold'>wordle rury</h1>
      </div>
      <ul className='flex items-center space-x-4 mx-4'>
        <li>
          <span className='text-xl text-slate-500 font-bold uppercase flex items-center space-x-2 rounded-sm'>
            {locations[location.pathname]}
          </span>
        </li>
        <li>
          <ToggleTheme toggleTheme={() => {}} />
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className='dark:bg-slate-900 bg-white py-2'>
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/easy" element={<EasyPage />} />
      </Routes>
    </Router>
  )
}

export default App