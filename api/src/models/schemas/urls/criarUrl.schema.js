import Joi from 'joi';
import { validator } from '../../../utils/validator.util.js';

const criarUrlSchema = Joi.object({
    url: Joi.string().regex(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/).required(),
    urlId: Joi.string().alphanum(),
    descricao: Joi.string().max(255),
    dataExpiracao: Joi.date().greater(new Date()),
    acessoMaximo: Joi.number().integer()/*,
    categorias: Joi.array().items({
        id: Joi.string().id(),
        nome: Joi.string()
    })*/
});

const validateCriarUrlReq = validator(criarUrlSchema);
export { validateCriarUrlReq };