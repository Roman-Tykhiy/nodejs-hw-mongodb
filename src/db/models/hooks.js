export const handleServerError = (error, doc, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === 'MongoServerError' ? 409 : 400;
  next();
};

export const hendleUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
