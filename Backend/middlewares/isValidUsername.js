import Joi from "joi";

export const validateUsername = (req, res, next) => {
  const { username } = req.body;
  const schema = Joi.object({
    username: Joi.string().min(6).max(14).required(),
  });

  const { error } = schema.validate({ username });
  if (error) {
    return res.status(400).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
  next();
};
