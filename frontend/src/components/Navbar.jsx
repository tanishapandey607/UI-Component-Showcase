import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="text-gray-400 body-font bg-[#131417] border-b border-[#24262B]">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            className="w-10 h-10 text-[#1A1200] p-2 bg-[#FFB454] rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl text-gray-100">UI Components</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 text-gray-400 hover:text-[#FFB454]" href='/'>Home</Link>
          <Link className="mr-5 text-gray-400 hover:text-[#FFB454]" href='/login'>Login</Link>
          <Link className="mr-5 text-gray-400 hover:text-[#FFB454]" href='/signup'>Sign-up</Link>
          <Link className="mr-5 text-gray-400 hover:text-[#FFB454]" href='/browse'>Elements</Link>
          {/* <Link className="mr-5 text-gray-400 hover:text-[#FFB454]" href='/Todoapp'></Link> */}
          {/* <Link className="mr-5 text-gray-400 hover:text-[#FFB454]" href='/portfolio'>Portfolio</Link> */}
           {/* Link tag :- used to link pg without re-loading and the first letter should be upper can't be written without
           */}
        </nav>
        <Link href='/create' className="mr-5 text-gray-400 hover:text-[#FFB454]">
        <button className="inline-flex items-center bg-[#17181C] border border-[#24262B] text-gray-200 py-1 px-3 focus:outline-none hover:bg-[#1B1C20] hover:border-[#FFB454]/40 rounded text-base mt-4 md:mt-0 transition-colors">
          Create
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        </Link>
      </div>
    </header>
  )
}

export default Navbar