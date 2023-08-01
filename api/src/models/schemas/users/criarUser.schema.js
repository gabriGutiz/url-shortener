import Joi from "joi";
import { validator } from '../../../utils/validator.util.js';

const criarUserSchema = Joi.object({
    user: Joi.string().required().regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
    senha: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/)
});

const validateCriarUserReq = validator(criarUserSchema);
export { validateCriarUserReq };