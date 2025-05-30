import Sidebar from '~/ui/components/Sidebar';
import HamburgerMenu from '~/ui/components/HamburgerMenu';
import { EditPageForm } from './EditPageForm';
import { Content } from './_types';

interface PageProps {
  page: Content;
}

export default function Page({ page }: PageProps) {
  if (!page) return <div>Missing page data</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <HamburgerMenu />
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Edit Page</h1>
          <EditPageForm page={page} />
        </div>
      </main>
    </div>
  );
}
