type ErrorMessageProps = {
  message: string | undefined;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="alert alert-error">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 mx-2 stroke-current text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
        <label className="text-white">{message}</label>
      </div>
    </div>
  );
}
