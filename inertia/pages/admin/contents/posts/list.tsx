import { useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'

export default function Post() {
  const [, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Hamburger menu for mobile */}
      <HamburgerMenu onClick={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">List Post</h1>
          <p className="text-gray-600"></p>
        </div>
      </main>
    </div>
  )
}
