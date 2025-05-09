import { Alert, AlertDescription } from '../../lib/shadcn';

export type ErrorType = string | string[] | Record<string, string> | undefined | null;

type TProps = {
  error: ErrorType;
};

export function ErrorNotice({ error }: TProps) {
  if (!error) return null;

  let errorList: string[] = [];

  if (typeof error === 'string') {
    errorList = [error];
  } else if (Array.isArray(error)) {
    errorList = error;
  } else if (typeof error === 'object') {
    errorList = Object.values(error);
  }

  if (errorList.length === 0) return null;

  return (
    <Alert variant="danger">
      <AlertDescription>
        <ul className="list-inside list-disc">
          {errorList.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
