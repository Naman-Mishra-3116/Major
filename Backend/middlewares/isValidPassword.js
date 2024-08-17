import Joi from "joi";

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ password });
  if (error) {
    return res.status(200).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
  next()
};

export const validateConfirmPassword = (req, res, next) => {
  const { confirmPassword } = req.body;
  const schema = Joi.object({
    confirmPassword: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ confirmPassword });
  if (error) {
    return res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
  next();
};
