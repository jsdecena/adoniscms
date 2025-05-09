interface Props {
  error: string | undefined;
}

const FormError = ({ error }: Props): React.JSX.Element => {
  if (!error) return <></>;
  return (
    <div className="w-full rounded absolute -bottom-5 text-xs right flex bg-red-400 px-1">
      <span className="text-xs text-white">{error ?? ''}</span>
    </div>
  );
};

export default FormError;
