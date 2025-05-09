import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileAlt, faHome } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  className?: string
  children?: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ className = '', children }) => (
  <aside className={`w-64 bg-white border-r border-gray-200 flex-col py-8 px-4 shadow-md relative hidden md:flex ${className}`}>
    <div className="mb-8 flex items-center justify-between">
      <span className="text-2xl font-bold text-gray-800">Admin</span>
    </div>
    <nav className="flex-1">
      <ul className="space-y-2">
        <li>
          <a href="/admin" className="gap-2 flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </li>        
        <li>
          <a href="/admin/pages" className="gap-2 flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faFile} /> Pages
          </a>
        </li>
        <li>
          <a href="/admin/posts" className="gap-2 flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
          <FontAwesomeIcon icon={faFileAlt} /> Posts
          </a>
        </li>
      </ul>
    </nav>
    {children}
    <a href="/logout" className="absolute bottom-8 left-4 right-4 flex items-center justify-center px-4 py-2 rounded-lg text-red-500 border border-red-100 hover:bg-red-50 font-medium transition">
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
      Logout
    </a>
  </aside>
)

export default Sidebar
