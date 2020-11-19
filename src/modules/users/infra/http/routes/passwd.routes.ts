import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswdController from '../controllers/ForgotPasswdController';
import ResetPasswdController from '../controllers/ResetPasswdController';

const passwdRouter = Router();
const forgotPasswdController = new ForgotPasswdController();
const resetPasswdController = new ResetPasswdController();

passwdRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswdController.create,
);

passwdRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswdController.create,
);

export default passwdRouter;
