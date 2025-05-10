import Form from '~/lib/create-form';
import { useToast } from '~/ui/components/ToastProvider';
import EditPostFormFields from './EditPostFormFields';
import { Content, ENUM_CONTENT_STATUS, ENUM_CONTENT_TYPE, ENUM_VISIBILITY, TPayload, TPayloadSchema } from './_types';
import { useUpdatePost } from './_hooks';

export function EditPostForm({ post }: { post: Content }) {
  const { mutate } = useUpdatePost();
  const { showToast } = useToast();

  const onSubmit = (v: TPayload): void => {
    mutate({ id: post.id, payload: v }, {
      onSuccess: () => {
        showToast('Post updated successfully');
      },
      onError: (error: any) => {
        const message = error?.message || 'An error occurred';
        showToast(message);
      },
    });
  };

  const FORM_INIT: TPayload = {
    title: post?.title,
    body: post?.body ?? '',
    excerpt: post?.excerpt ?? '',
    status: (post?.status as ENUM_CONTENT_STATUS) || ENUM_CONTENT_STATUS.DRAFT,
    visibility: (post?.visibility as ENUM_VISIBILITY) || ENUM_VISIBILITY.PUBLIC,
    type: (post?.type as ENUM_CONTENT_TYPE) || ENUM_CONTENT_TYPE.POST,
  };  

  return (
    <Form
      onSubmit={onSubmit}
      className="space-y-4"
      zodSchema={TPayloadSchema}
      defaultValues={FORM_INIT}
    >
      <EditPostFormFields />
      <button 
        type="submit"
        className="btn btn-social w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-md bg-indigo-600 text-white hover:bg-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
      <a 
        href='/admin/posts'
        className="btn btn-social w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-md bg-gray-600 text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Go Back
      </a>      
    </Form>
  );
}
