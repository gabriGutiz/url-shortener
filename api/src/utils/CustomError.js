
class CustomError {
    constructor(statusCode, mensagem) {
        this.statusCode = statusCode || 500;
        this.body = {
            code: statusCode || 500,
            message: mensagem || 'Internal Server Error'
        };
    }
}

export { CustomError };