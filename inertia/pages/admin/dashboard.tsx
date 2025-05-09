import { useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Hamburger menu for mobile */}
      <HamburgerMenu onClick={() => setSidebarOpen(true)} />

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setSidebarOpen(false)}></div>
          <Sidebar className="relative z-50 flex md:hidden" />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Dashboard</h1>
          <p className="text-gray-600"></p>
        </div>
      </main>
    </div>
  )
}
