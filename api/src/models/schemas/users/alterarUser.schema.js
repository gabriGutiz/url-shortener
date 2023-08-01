import Joi from "joi";
import { validator } from '../../../utils/validator.util.js';

const alterarUserSchema = Joi.object({
    user: Joi.string().regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
    // Mais de 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e carater especial
    senha: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/),
    ativo: Joi.bool()
});

const validateAlterarUserReq = validator(alterarUserSchema);
export { validateAlterarUserReq };