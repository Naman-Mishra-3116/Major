import joi from "joi";

export const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const schema = joi.object({
      email: joi.string().email().required(),
    });
    const { error } = schema.validate({
      email,
    });

    if (error) {
      throw new Error(error.message);
    }
    next();
  } catch (err) {
    console.error("Error occured in validateEmail Middleware");
    console.error(err.message);
    return res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export const validateUsername = function (req, res, next) {
  try {
    const { username } = req.body;
    const schema = joi.object({
      username: joi.string().min(8).max(16).required(),
    });
    const { error } = schema.validate({
      username,
    });

    if (error) {
      throw new Error(error.message);
    }
    next();
  } catch (err) {
    console.error("Error occured in validateUsername Middleware");
    console.error(err.message);
    return res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export const validatePassword = function (req, res, next) {
  try {
    const { password } = req.body;
    const schema = joi.object({
      password: joi.string().min(6).max(16).required(),
    });
    const { error } = schema.validate({ password });
    if (error) {
      throw new Error(error.message);
    }

    next();
  } catch (err) {
    console.error("Error occured in validatePassword Middleware");
    console.error(err.message);
    return res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export const validateConfirmPassword = function (req, res, next) {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const schema = joi.object({
      confirmPassword: joi.string().min(6).max(16).required(),
    });
    const { error } = schema.validate({
      confirmPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
    next();
  } catch (error) {
    console.error("Error occured in validateConfirmPassword Middleware");
    console.error(err.message);
    return res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};
