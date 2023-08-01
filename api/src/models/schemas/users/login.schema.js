import Joi from "joi";
import { validator } from '../../../utils/validator.util.js';

const alterarUserSchema = Joi.object({
    user: Joi.string().required(),
    senha: Joi.string().required()
});

const validateLoginReq = validator(alterarUserSchema);
export { validateLoginReq };
    