import Joi from "joi";
import { validator } from '../../../utils/validator.util.js';

const buscarUsersSchema = Joi.object({
    ativo: Joi.bool(),
    dataInicioCriacao: Joi.date(),
    dataFimCriacao: Joi.date()
});

const validateBuscarUsersReq = validator(buscarUsersSchema);
export { validateBuscarUsersReq };