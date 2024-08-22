import { Router } from "express";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../middlewares/InputValidation.js";

import { verifyAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  singupController,
  loginController,
  renewAccessToken,
  getLoggedInUserInfo,
} from "../controllers/userController.js";

const router = Router();

router
  .route("/auth/login")
  .post(validateEmail, validatePassword, loginController);

router
  .route("/auth/signup")
  .post(validateEmail, validatePassword, validateUsername, singupController);

router.route("/auth/getInfo").get(getLoggedInUserInfo);
router.route("/auth/test").get(verifyAuthenticated, (_, res) => {
  res.status(200).json({
    message: "hello from protected router",
    data: [
      {
        a: "apple",
      },
      {
        b: "ball",
      },
    ],
  });
});

router.route("/auth/refresh").post(renewAccessToken);

export { router as UserRouter };
