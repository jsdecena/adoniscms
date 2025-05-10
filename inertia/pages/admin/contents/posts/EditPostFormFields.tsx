import { useFormHelper } from '~/lib/create-form';
import { FormInput, FormSelect } from '~/ui/forms';
import FormWysiwyg from '~/ui/forms/FormWysiwyg';
import { CONTENT_STATUS, ENUM_CONTENT_STATUS, TPayloadSchema } from './_types';

function EditPostFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormHelper(TPayloadSchema);
  return (
    <>
      <FormInput
        label="Title"
        register={register('title')}
        placeholder="Post title"
        error={errors?.title?.message ?? ''}
      />
      <FormWysiwyg
        name="body"
        label="Body"
        error={errors?.body?.message ?? ''}
        required
      />
      <FormSelect
        label="Status"
        register={register('status')}
        options={CONTENT_STATUS.map((s: ENUM_CONTENT_STATUS) => ({ value: s, label: s.toUpperCase() }))}
        error={errors?.status?.message ?? ''}
      />
    </>
  );
}

export default EditPostFormFields;
