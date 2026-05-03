// Extracts a readable error message from axios errors or unknown throws
const handleError = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};

export default handleError;
