import React, { useState } from 'react'
import Sidebar from './Sidebar'

interface HamburgerMenuProps {
  className?: string
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        className={`md:hidden fixed top-0 left-0 w-full h-14 z-[9999] flex items-center bg-white shadow-md border-b border-gray-200 px-4 ${className}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        type="button"
        style={{ borderRadius: 0 }}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile sidebar overlay and menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-[90] bg-black/30" 
            onClick={toggleSidebar}
          />
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-[110] w-64 md:hidden">
            <Sidebar className="h-full" />
          </div>
        </>
      )}
    </>
  )
}

export default HamburgerMenu
