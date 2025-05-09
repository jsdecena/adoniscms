import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react/components/Table'
import { useEffect, useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'
import { useFetchPages, useDeletePage } from './_hooks';
import { Content } from './_types';
import { Button } from 'flowbite-react';
import StatusBadge from '~/ui/components/StatusBadge';
import { router } from '@inertiajs/react';
import Modal from '~/ui/components/_Modal';

export default function Page() {
  const fetchPages = useFetchPages();
  const deletePage = useDeletePage();
  const [pages, setPages] = useState<Content[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState('');

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
    setDeleteId(id);
    setDeleteInput('');
    setDeleteError('');
    setShowDeleteModal(true);
  }

  const handleDeleteConfirm = async () => {
    if (deleteInput !== 'delete') {
      setDeleteError("You must type 'delete' to confirm.");
      return;
    }
    if (deleteId) {
      try {
        await deletePage.mutateAsync({ id: deleteId });
        // Instantly reload the pages list
        const res = await fetchPages.mutateAsync();
        setPages(res);
        setShowDeleteModal(false);
        setDeleteId(null);
        setDeleteInput('');
        setDeleteError('');
      } catch (e: any) {
        setDeleteError(e?.message || 'Delete failed');
      }
    }
  };

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
        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-xl font-semibold">Confirm Delete</h2>
            <p>Type <span className="font-bold">delete</span> to confirm deletion of this page.</p>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={deleteInput}
              onChange={e => { setDeleteInput(e.target.value); setDeleteError(''); }}
              placeholder="Type 'delete' to confirm"
              autoFocus
            />
            {deleteError && <div className="text-red-500 text-sm">{deleteError}</div>}
            <div className="flex gap-2 justify-end">
              <Button color="gray" type="button" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button color="red" type="button" onClick={handleDeleteConfirm} disabled={deleteInput !== 'delete' || deletePage.isPending}>
                {deletePage.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  )
}
