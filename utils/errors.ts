export const formErrors = (errorType: string) => {
  const error = {
    required: "This field is required",
    minLength: "This field must be at least 6 characters",
    maxLength: "This field must be less than 20 characters",
  }[errorType];

  return error;
};
