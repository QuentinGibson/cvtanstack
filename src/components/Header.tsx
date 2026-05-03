import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { UserButton, Show, useAuth } from '@clerk/tanstack-react-start'

const address = import.meta.env.VITE_ADDRESS || ''
const phone = import.meta.env.VITE_PHONE || ''
const email = import.meta.env.VITE_EMAIL || ''

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { signOut } = useAuth()

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
      <nav className="fixed top-0 left-0 w-full bg-dark-bg px-[15px] py-[19px] flex items-center justify-between z-[99998] transition-all duration-200 border-b border-border-light">

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-text-main text-[13px] outline-none hover:text-brand transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="m-auto">
          <span className="logo text-white">quent.</span>
        </Link>

        {/* Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="text-text-main text-[13px] outline-none hover:text-brand transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </nav>

      {/* Slide-in Vertical Menu Overlay */}
      <div
        className={`fixed top-0 w-[455px] max-w-[100vw] h-full bg-dark-bg flex flex-col justify-between p-[50px] md:p-[100px] z-[99999] transition-all duration-300 ease-in-out ${isMenuOpen ? "left-0" : "-left-[455px]"
          }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-[30px] right-[45px] w-[30px] h-[30px] group outline-none"
        >
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 -rotate-45 transition-all duration-200 group-hover:bg-brand"></span>
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 rotate-45 transition-all duration-200 group-hover:bg-brand"></span>
        </button>

        <div className="flex flex-col h-full justify-between">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <span className="logo text-white mb-[40px] block">quent.</span>
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
                      className="text-white text-[18px] font-semibold font-orbitron uppercase leading-[50px] transition-colors duration-200 hover:text-brand"
                      activeProps={{ className: 'text-brand' }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Auth Buttons */}
            <div className="mt-[40px] flex flex-col gap-[12px]">
              <Show when="signed-out">
                <Link
                  to="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-white text-[18px] font-semibold font-orbitron uppercase leading-[50px] transition-colors duration-200 hover:text-brand outline-none"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-[13px] font-orbitron uppercase tracking-widest px-[18px] py-[10px] border border-brand text-brand rounded-[4px] transition-all duration-200 hover:bg-brand hover:text-dark-bg outline-none"
                >
                  Sign Up
                </Link>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-[12px] leading-[50px]">
                  <UserButton />
                  <Link
                    to="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-[14px] font-orbitron uppercase tracking-widest hover:text-brand transition-colors"
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="text-white text-[14px] font-orbitron uppercase tracking-widest hover:text-brand transition-colors ml-2 outline-none"
                  >
                    Sign Out
                  </button>
                </div>
              </Show>
            </div>
          </div>

          <p className="text-white text-[17px] font-rajdhani mt-[30px] leading-[26px]">
            {address && <>{address}<br /></>}
            {phone && <>{phone}<br /></>}
            {email && <>{email}<br /><br /></>}
            Powered by CVbuilder<br />
            All rights reserved 2018
          </p>
        </div>
      </div>

      {/* Full Screen Search Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-dark-bg/95 flex items-center justify-center z-[99999] transition-all duration-300 ease-in-out ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-[30px] right-[50px] w-[30px] h-[30px] group outline-none"
        >
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 -rotate-45 transition-all duration-200 group-hover:bg-brand"></span>
          <span className="absolute top-[3px] left-1/2 w-[2px] h-[24px] bg-white rounded-[2px] -translate-x-1/2 rotate-45 transition-all duration-200 group-hover:bg-brand"></span>
        </button>
        <form className="text-center w-full max-w-[800px] px-[20px]" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-b border-white/30 outline-none text-white text-[30px] md:text-[50px] font-rajdhani w-full text-center placeholder:text-white/50 focus:border-brand transition-colors duration-300 pb-[10px]"
            autoFocus={isSearchOpen}
          />
        </form>
      </div>

    </header>
  )
}

