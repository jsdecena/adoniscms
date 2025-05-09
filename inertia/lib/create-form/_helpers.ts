import { useFormContext, type UseFormReturn } from 'react-hook-form';
import type { z, ZodSchema } from 'zod';

/**
 * The `useFormHelper` function returns the form context for a given Zod schema within a Form
 * component.
 * @param {T} _schema - The `_schema` parameter in the `useFormHelper` function is a generic type `T`
 * that extends `ZodSchema`. It is used to define the schema for the form data validation. The
 * `ZodSchema` is a schema definition library for TypeScript that allows you to define and validate
 * @returns The `useFormHelper` function returns the `formContext` if it exists, which is obtained
 * using the `useFormContext` hook with the schema type inferred from the input `_schema`. If
 * `formContext` is null, an error message is logged to the console and an empty object casted as
 * `UseFormReturn<z.infer<T>>` is returned.
 * *  #### Example usage
 * ```ts
 * const { register } = useFormHelper(ZodSchema)
 * ```
 */

export const useFormHelper = <T extends ZodSchema>(_schema: T) => {
  const formContext = useFormContext<z.infer<typeof _schema>>();
  if (!formContext) {
    // eslint-disable-next-line
    console.error(
      "useFormHelper is null. Make sure you're using useFormHelper within the Form component."
    );
    return {} as UseFormReturn<z.infer<T>>;
  }
  return formContext;
};
