
class CustomError {
    constructor(statusCode=500, mensagem='Internal Server Error') {
        this.statusCode = statusCode;
        this.body = {
            code: statusCode,
            message: mensagem 
        };
    }
}

export { CustomError };