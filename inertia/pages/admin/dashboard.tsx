import { useEffect, useState } from 'react'
import HamburgerMenu from '../../ui/components/HamburgerMenu'

export default function Dashboard() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col py-8 px-4 shadow-md relative">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">Admin</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zm0 0v6a9 9 0 009 9 9 9 0 009-9V7"></path></svg>
                Pages
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>
                Posts
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <svg className="w-5 h-5 mr-3 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                Categories
              </a>
            </li>
          </ul>
        </nav>
        <a href="/logout" className="absolute bottom-8 left-4 right-4 flex items-center justify-center px-4 py-2 rounded-lg text-red-500 border border-red-100 hover:bg-red-50 font-medium transition">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          Logout
        </a>
      </aside>

      {/* Hamburger menu for mobile */}
      <HamburgerMenu onClick={() => setSidebarOpen(true)} />

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 shadow-md z-50">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-800">Admin</span>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                    <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zm0 0v6a9 9 0 009 9 9 9 0 009-9V7"></path></svg>
                    Pages
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>
                    Posts
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                    <svg className="w-5 h-5 mr-3 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                    Categories
                  </a>
                </li>
              </ul>
            </nav>
            <a href="/logout" className="absolute bottom-8 left-4 right-4 flex items-center justify-center px-4 py-2 rounded-lg text-red-500 border border-red-100 hover:bg-red-50 font-medium transition">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
              Logout
            </a>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to the Admin Dashboard</h1>
          <p className="text-gray-600">Select a section from the sidebar to manage Pages, Posts, or Categories.</p>
        </div>
      </main>
    </div>
  )
}
