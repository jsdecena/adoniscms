import { Alert, AlertDescription } from '../../lib/shadcn';

type TProps = {
  error: string[];
};

export function ErrorNotice({ error }: TProps) {
  return (
    <Alert variant="danger">
      <AlertDescription>
        <ul className="list-inside list-disc">
          {error?.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
