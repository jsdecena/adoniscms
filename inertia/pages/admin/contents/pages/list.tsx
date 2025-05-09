import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react/components/Table'
import { useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'

export default function Page() {
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
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">List Pages</h1>
          <p className="text-gray-600"></p>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Title</TableHeadCell>
                  <TableHeadCell>Excerpt</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>
                    Actions
                    <span className="sr-only">Edit</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Apple MacBook Pro 17"
                  </TableCell>
                  <TableCell>Sliver</TableCell>
                  <TableCell>Laptop</TableCell>
                  <TableCell>$2999</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                  </TableCell>
                  <TableCell>White</TableCell>
                  <TableCell>Laptop PC</TableCell>
                  <TableCell>$1999</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</TableCell>
                  <TableCell>Black</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell>$99</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}
