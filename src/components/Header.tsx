import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    if (searchQuery.trim()) {
      navigate({ to: '/search', search: { q: searchQuery.trim() } })
      setSearchQuery('')
    }
  }

  return (
    <header className="pb-[90px] relative z-[99999]">
      <nav className="fixed top-0 left-0 w-full bg-white px-[15px] py-[19px] flex items-center justify-between z-[99998] transition-all duration-200 border-b border-[#e4e4e4]">
        
        {/* Hamburger Icon */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-[#37404d] text-[13px] outline-none hover:text-[#ff9900] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="m-auto">
          <img src="/images/logo.png" alt="Logo" className="max-h-[30px]" />
        </Link>
        
        {/* Search Icon */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="text-[#37404d] text-[13px] outline-none hover:text-[#ff9900] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </nav>

      {/* Slide-in Vertical Menu Overlay */}
      <div 
        className={`fixed top-0 w-[455px] max-w-[100vw] h-full bg-[#111111] flex flex-col justify-between p-[50px] md:p-[100px] z-[99999] transition-all duration-300 ease-in-out ${
          isMenuOpen ? "left-0" : "-left-[455px]"
        }`}
      >
        {/* Close button */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-[30px] right-[45px] w-[30px] h-[30px] group outline-none"
        >
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 -rotate-45 transition-all duration-200 group-hover:bg-[#ff9900]"></span>
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 rotate-45 transition-all duration-200 group-hover:bg-[#ff9900]"></span>
        </button>

        <div className="flex flex-col h-full justify-between">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src="/images/logo2.png" alt="Logo White" className="mb-[40px] max-h-[30px]" />
          </Link>
          
          <div className="flex-grow">
            <ul className="flex flex-col m-0 p-0 list-none">
              {['/', '/about', '/services', '/blog', '/contact'].map((path) => {
                const label = path === '/' ? 'Work' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2);
                return (
                  <li key={path} className="block relative">
                    <Link 
                      to={path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white text-[18px] font-semibold font-['Montserrat',sans-serif] uppercase leading-[50px] transition-colors duration-200 hover:text-[#ff9900]"
                      activeProps={{ className: 'text-[#ff9900]' }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <p className="text-white text-[17px] font-['Crimson_Text',serif] mt-[30px] leading-[26px]">
            587 Str. Norman Crook, New York, USA <br />
            (414) 757-885<br />
            info@yourdomain.com<br /><br />
            Powered by CVbuilder<br />
            All rights reserved 2018
          </p>
        </div>
      </div>

      {/* Full Screen Search Overlay */}
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-[#111111]/95 flex items-center justify-center z-[99999] transition-all duration-300 ease-in-out ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <button 
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-[30px] right-[50px] w-[30px] h-[30px] group outline-none"
        >
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 -rotate-45 transition-all duration-200 group-hover:bg-[#ff9900]"></span>
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 rotate-45 transition-all duration-200 group-hover:bg-[#ff9900]"></span>
        </button>
        <form className="text-center w-full max-w-[800px] px-[20px]" onSubmit={handleSearchSubmit}>
          <input 
            type="search" 
            placeholder="Search ..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-b border-white/30 outline-none text-white text-[30px] md:text-[50px] font-['Crimson_Text',serif] w-full text-center placeholder:text-white/50 focus:border-[#ff9900] transition-colors duration-300 pb-[10px]"
            autoFocus={isSearchOpen}
          />
        </form>
      </div>

    </header>
  )
}

