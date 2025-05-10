import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react/components/Table'
import { useEffect, useState } from 'react'
import HamburgerMenu from '~/ui/components/HamburgerMenu'
import Sidebar from '~/ui/components/Sidebar'
import { useFetchPosts, useDeletePost } from './_hooks';
import { Content } from './_types';
import { Button } from 'flowbite-react';
import StatusBadge from '~/ui/components/StatusBadge';
import { router } from '@inertiajs/react';
import Modal from '~/ui/components/_Modal';
import DOMPurify from 'dompurify';

export default function Post() {
  const fetchPosts = useFetchPosts();
  const deletePost = useDeletePost();
  const [posts, setPosts] = useState<Content[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchPosts.mutateAsync();
        setPosts(res)
      } catch (e) {
        setPosts([])
      }
    };
    fetch();
  }, []);

  const onEdit = (id: string) => {
    router.visit(`/admin/posts/${id}/edit`)
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
        await deletePost.mutateAsync({ id: deleteId });
        // Instantly reload the posts list
        const res = await fetchPosts.mutateAsync();
        setPosts(res);
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
    router.visit('/admin/posts/create');
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
            <h1 className="text-3xl font-semibold text-gray-800">Posts</h1>
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
                {posts.map((item) => (
                  <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.title}</TableCell>
                    <TableCell className='w-1/2'>
                      <div
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body ?? '') }}
                      />
                    </TableCell>
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
            <p>Type <span className="font-bold">delete</span> to confirm deletion of this post.</p>
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
              <Button color="red" type="button" onClick={handleDeleteConfirm} disabled={deleteInput !== 'delete' || deletePost.isPending}>
                {deletePost.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  )
}
