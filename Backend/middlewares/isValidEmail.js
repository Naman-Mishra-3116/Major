import Joi from "joi";

export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate({ email });
  console.log(error);

  if (error) {
    return res
      .status(200)
      .json({ message: error.message, error: true, success: false });
  }
  next();
};
