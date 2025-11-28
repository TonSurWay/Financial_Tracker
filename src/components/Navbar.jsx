import React,{ useState, useEffect } from 'react'

// React Router
import { Link } from 'react-router'

// Icon Library
import { Sun, Moon } from 'lucide-react'

function Navbar() {

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("toggle", toggle);
  }, );

  return (
    
    <header className='shadow-md bg-transparent'>
        <nav className='container mx-auto w-full  flex items-center justify-between h-20 px-4 '>
            <Link to='/' className='flex item-center justify-center py-4 text-indigo-500'>
                <h1 className='sm:text-3xl lg:text-4xl font-bold '>$SurwayTracker</h1>
            </Link>

            <button
              className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:bg-indigo-200 transition"
              onClick={()=> setToggle((prev) => !prev)}
            >
              {toggle ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </nav>
      </header>
  )
}

export default Navbar