import { Router } from "express";
import { handleLoginRequest } from "../controllers/loginController.js";
import { handleSignupRequest } from "../controllers/singupController.js";
import { validateEmail } from "../middlewares/isValidEmail.js";
import { validatePassword } from "../middlewares/isValidPassword.js";
import { validateUsername } from "../middlewares/isValidUsername.js";
const router = Router();

router.post("/auth/login", validateEmail, validatePassword, handleLoginRequest);

router.post(
  "/auth/signup",
  validateUsername,
  validateEmail,
  validatePassword,
  handleSignupRequest
);

export { router as AuthRouter };
