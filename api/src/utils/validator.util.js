const validator = (schema) => (payload) => schema.validate(payload);

export { validator };