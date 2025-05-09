import { useState } from 'react';
import Sidebar from '~/ui/components/Sidebar';
import HamburgerMenu from '~/ui/components/HamburgerMenu';
import { EditPageForm } from './EditPageForm';
import { Content, TPayload, ENUM_CONTENT_STATUS, ENUM_VISIBILITY, ENUM_CONTENT_TYPE } from './_types';

interface PageProps {
  page: Content;
}

export default function Page({ page }: PageProps) {
  const [, setSidebarOpen] = useState(false);

  if (!page) return <div>Missing page data</div>;

  // Prepare initial values for the form, casting to enums
  const initialValues: TPayload = {
    title: page.title,
    body: page.body ?? '',
    excerpt: page.excerpt ?? '',
    status: (page.status as ENUM_CONTENT_STATUS) || ENUM_CONTENT_STATUS.DRAFT,
    visibility: (page.visibility as ENUM_VISIBILITY) || ENUM_VISIBILITY.PUBLIC,
    type: (page.type as ENUM_CONTENT_TYPE) || ENUM_CONTENT_TYPE.PAGE,
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <HamburgerMenu onClick={() => setSidebarOpen(true)} />
      <main className="flex-1 flex flex-col items-start justify-start p-8">
        <div className="w-full h-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Edit Page</h1>
          <EditPageForm initialValues={initialValues} id={page.id} />
        </div>
      </main>
    </div>
  );
}
