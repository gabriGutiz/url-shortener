import Joi from "joi";
import { validator } from "../../../utils/validator.util.js";

const buscarUrlsSchema = Joi.object({
    ativo: Joi.bool(),
    urlId: Joi.string(),
    url: Joi.string()
});

const validateBuscarUrlsReq = validator(buscarUrlsSchema);
export { validateBuscarUrlsReq };