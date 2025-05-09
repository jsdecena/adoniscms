import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react/components/Table'
import { useEffect, useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'
import { useFetchPages } from './_hooks';
import { Content } from './_types';
import { Button } from 'flowbite-react';
import StatusBadge from '~/ui/components/StatusBadge';
import { router } from '@inertiajs/react';

export default function Page() {
  const fetchPages = useFetchPages();
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

  const onEdit = (id: string) => {
    router.visit(`/admin/pages/${id}/edit`)
  }

  const onDelete = (id: string) => {
    //
  }  

  const onCreate = () => {
    router.visit('/admin/pages/create');
  }
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <HamburgerMenu />
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Pages</h1>
            <Button className='w-25' color='dark' type='button' onClick={onCreate}>Create</Button>
          </div>
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
                  <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.title}</TableCell>
                    <TableCell className='w-1/2'>{item.body}</TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                    <TableCell className='flex flex-row justify-start gap-2'>
                      <Button className='w-25' type='button' color='yellow' onClick={() => onEdit(item.id)}>Edit</Button>
                      <Button className='w-25' type='button' color='red' onClick={() => onDelete(item.id)}>Delete</Button>
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
