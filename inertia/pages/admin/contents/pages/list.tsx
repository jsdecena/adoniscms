import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react/components/Table'
import { useEffect, useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'
import { useFetchPages } from './_hooks';
import { Content } from './_types';
import { Button } from 'flowbite-react';
import StatusBadge from '~/ui/components/StatusBadge';

export default function Page() {
  const fetchPages = useFetchPages();
  const [, setSidebarOpen] = useState(false)
  const [pages, setPages] = useState<Content[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchPages.mutateAsync();
        setPages(res)
      } catch (e) {
        setPages([])
      }
    };
    fetch();
  }, []);
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Hamburger menu for mobile */}
      <HamburgerMenu onClick={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Pages</h1>
          <p className="text-gray-600"></p>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Title</TableHeadCell>
                  <TableHeadCell>Content</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>
                    Actions
                    <span className="sr-only">Edit</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {pages.map((item) => (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.title}</TableCell>
                    <TableCell className='w-1/2'>{item.body}</TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                    <TableCell>
                      <Button>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}
