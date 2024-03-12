type SuccessMessageProps = {
  message: string | undefined;
};

export default function SuccessMessage({ message }: SuccessMessageProps) {
  if (!message) return null;

  return (
    <div className="alert alert-success">
      <div className="flex-1">
        <label className="text-white">{message}</label>
      </div>
    </div>
  );
}
