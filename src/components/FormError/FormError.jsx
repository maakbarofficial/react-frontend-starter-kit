import React from 'react';

const FormError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="px-2 py-1 text-[10px] text-red-800 rounded-md bg-red-50 dark:bg-gray-800 dark:text-red-400">
      <span className="font-bold text-[10px]">{error}</span>
    </div>
  );
};

export default FormError;
