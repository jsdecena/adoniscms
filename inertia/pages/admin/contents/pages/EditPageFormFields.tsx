import { useFormHelper } from '~/lib/create-form';
import { FormInput, FormTextArea, FormSelect } from '~/ui/forms';
import { CONTENT_STATUS, ENUM_CONTENT_STATUS, TPayloadSchema } from './_types';

function EditPageFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormHelper(TPayloadSchema);
  return (
    <>
      <FormInput
        label="Title"
        register={register('title')}
        placeholder="Page title"
        error={errors?.title?.message ?? ''}
      />
      <FormTextArea
        label="Body"
        register={register('body')}
        placeholder="Page content"
        error={errors?.body?.message ?? ''}
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

export default EditPageFormFields;
