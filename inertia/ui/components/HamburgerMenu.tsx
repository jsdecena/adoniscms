import React from 'react'

interface HamburgerMenuProps {
  onClick: () => void
  ariaLabel?: string
  className?: string
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick, ariaLabel = 'Open sidebar', className = '' }) => (
  <button
    className={`md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md border border-gray-200 ${className}`}
    onClick={onClick}
    aria-label={ariaLabel}
    type="button"
  >
    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
)

export default HamburgerMenu
