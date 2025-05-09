import Form from '~/lib/create-form';
import { useToast } from '~/ui/components/ToastProvider';
import EditPageFormFields from './EditPageFormFields';
import { TPayload, TPayloadSchema } from './_types';
import { useUpdatePage } from './_hooks';

export function EditPageForm({ initialValues, id }: { initialValues: TPayload, id: string }) {
  const { mutate } = useUpdatePage();
  const { showToast } = useToast();

  const onSubmit = (v: TPayload): void => {
    mutate({ id, payload: v }, {
      onSuccess: () => {
        showToast('Page updated successfully');
      },
      onError: (error: any) => {
        const message = error?.message || 'An error occurred';
        showToast(message);
      },
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="space-y-4"
      zodSchema={TPayloadSchema}
      defaultValues={initialValues}
    >
      <EditPageFormFields />
      <button 
        type="submit"
        className="btn btn-social w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-md bg-indigo-600 text-white hover:bg-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Changes
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
