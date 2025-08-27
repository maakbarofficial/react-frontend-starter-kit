import { toast } from 'react-toastify';

export const Validator = (schema, formData) => {
  const result = schema.safeParse(formData);
  if (!result.success) {
    const errorMessage = result.error.errors[0]?.message || 'Validation failed.';
    toast.error(errorMessage);
    return null;
  }

  return result.data;
};
