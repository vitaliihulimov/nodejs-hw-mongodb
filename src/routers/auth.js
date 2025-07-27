import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import { logOutUserController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logOutUserController));

export default router;
