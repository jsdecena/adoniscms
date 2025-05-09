import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { cn } from '../../utils';
import type { z } from 'zod';

interface IProps<T> {
  defaultValues: T;
  className?: string;
  zodSchema: z.ZodSchema;
  children: React.ReactNode;
  onSubmit: (_res: T) => void;
  action?: (_res: FormData) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
}

type TLayoutProps = React.ComponentProps<typeof Form>;
type TSchema = z.infer<TLayoutProps['zodSchema']>;

/**
 * # Form example usage.
 *
 * @example
 * ```tsx
 * import Form from 'src/lib/create-form';
 * import { FormInput } from 'src/ui/forms';
 *
 * const ZodSchema = z.object({
 *    name: z.string().min(1, {
 *      message: 'Name is required',
 *    }),
 *  });
 *
 * const INIT_FORM = {
 *    name: '',
 * };
 *
 * function Forms() {
 * return (
 *    <FormInput
 *      register={register('name')}
 *      label="Name"
 *      required
 *    />
 * );
 * }
 *
 * function App() {
 *    return (
 *      <Form
 *        defaultValues={INIT_FORM}
 *        zodSchema={ZodSchema}
 *        onSubmit={(v) => {
 *          console.log(v, ' here');
 *        }}
 *      >
 *      <Forms>
 *       <Button
 *         label="Submit"
 *         type="submit"
 *         color="primary"
 *         className="ml-auto w-32"
 *       />
 *     </Form>
 *   );
 * }
 * ```
 */

function Form<T>({
  children,
  zodSchema,
  defaultValues,
  onSubmit,
  action,
  className,
  mode = 'onSubmit',
}: IProps<T>) {
  const prevState = React.useRef(JSON.stringify(defaultValues));

  const methods = useForm<TSchema>({
    defaultValues: defaultValues || {},
    resolver: zodResolver(zodSchema),
    mode,
  });

  const { reset } = methods;

  React.useLayoutEffect(() => {
    const currentState = JSON.stringify(defaultValues);
    if (prevState?.current !== currentState) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((value) => onSubmit(value))}
        className={cn('', className)}
        {...(action && {
          action,
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
