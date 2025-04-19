export const handleServerError = (error, doc, next) => {
  error.status = 400;
  next();
};

export const hendleUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
