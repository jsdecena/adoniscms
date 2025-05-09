import Form from '~/lib/create-form';
import { useToast } from '~/ui/components/ToastProvider';
import EditPageFormFields from './EditPageFormFields';
import { ENUM_CONTENT_STATUS, ENUM_CONTENT_TYPE, ENUM_VISIBILITY, TPayload, TPayloadSchema } from './_types';
import { useCreatePage } from './_hooks';

export function CreatePageForm() {
  const { mutate } = useCreatePage();
  const { showToast } = useToast();

  const onSubmit = (v: TPayload): void => {
    mutate({ payload: v }, {
      onSuccess: () => {
        showToast('Page created successfully');
      },
      onError: (error: any) => {
        const message = error?.message || 'An error occurred';
        showToast(message);
      },
    });
  };

  const FORM_INIT: TPayload = {
    title: '',
    body: '',
    excerpt: '',
    status: ENUM_CONTENT_STATUS.DRAFT,
    visibility: ENUM_VISIBILITY.PUBLIC,
    type: ENUM_CONTENT_TYPE.PAGE,
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
