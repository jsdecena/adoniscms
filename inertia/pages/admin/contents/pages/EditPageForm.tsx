import Form from '~/lib/create-form';
import { useToast } from '~/ui/components/ToastProvider';
import EditPageFormFields from './EditPageFormFields';
import { Content, ENUM_CONTENT_STATUS, ENUM_CONTENT_TYPE, ENUM_VISIBILITY, TPayload, TPayloadSchema } from './_types';
import { useUpdatePage } from './_hooks';

export function EditPageForm({ page }: { page: Content }) {
  const { mutate } = useUpdatePage();
  const { showToast } = useToast();

  const onSubmit = (v: TPayload): void => {
    mutate({ id: page.id, payload: v }, {
      onSuccess: () => {
        showToast('Page updated successfully');
      },
      onError: (error: any) => {
        const message = error?.message || 'An error occurred';
        showToast(message);
      },
    });
  };

  const FORM_INIT: TPayload = {
    title: page?.title,
    body: page?.body ?? '',
    excerpt: page?.excerpt ?? '',
    status: (page?.status as ENUM_CONTENT_STATUS) || ENUM_CONTENT_STATUS.DRAFT,
    visibility: (page?.visibility as ENUM_VISIBILITY) || ENUM_VISIBILITY.PUBLIC,
    type: (page?.type as ENUM_CONTENT_TYPE) || ENUM_CONTENT_TYPE.PAGE,
  };  

  return (
    <Form
      onSubmit={onSubmit}
      className="space-y-4"
      zodSchema={TPayloadSchema}
      defaultValues={FORM_INIT}
    >
      <EditPageFormFields />
      <button 
        type="submit"
        className="btn btn-social w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-md bg-indigo-600 text-white hover:bg-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
      <a 
        href='/admin/pages'
        className="btn btn-social w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-md bg-gray-600 text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Go Back
      </a>      
    </Form>
  );
}
