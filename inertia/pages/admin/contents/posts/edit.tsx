import Sidebar from '~/ui/components/Sidebar';
import HamburgerMenu from '~/ui/components/HamburgerMenu';
import { EditPostForm } from './EditPostForm';
import { Content } from './_types';

interface PostProps {
  post: Content;
}

export default function Page({ post }: PostProps) {
  if (!post) return <div>Missing post data</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <HamburgerMenu />
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Edit Post</h1>
          <EditPostForm post={post} />
        </div>
      </main>
    </div>
  );
}
