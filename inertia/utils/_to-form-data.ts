export const toFormData = <T extends Record<keyof T, string>>(
  data: T
): FormData => {
  const formData = new FormData();

  (Object.keys(data) as Array<keyof T>).forEach((key) => {
    formData.append(key as string, data[key]);
  });

  return formData;
};
