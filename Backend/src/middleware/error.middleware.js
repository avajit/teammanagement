const errorMiddleware = (err, req, res, next) => {
  // Invalid JSON body sent by client
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON. Please check your request body.',
    });
  }

  // Known operational errors (AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('Unexpected error:', err);

  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong. Please try again later.',
    code: err.code || undefined,
  });
};

module.exports = errorMiddleware;
