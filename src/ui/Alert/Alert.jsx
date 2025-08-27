const Alert = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-xl text-red-800 font-bold rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
