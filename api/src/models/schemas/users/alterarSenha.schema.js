import Joi from "joi";
import { validator } from '../../../utils/validator.util.js';

const alterarSenhaSchema = Joi.object({
    senhaAtual: Joi.string().required(),
    // Mais de 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e carater especial
    senhaNova: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/).required()
});

const validateAlterarSenhaReq = validator(alterarSenhaSchema);
export { validateAlterarSenhaReq };