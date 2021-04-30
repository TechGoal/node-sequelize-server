class ExceptionHandling {
    constructor() { }

    build_error_response(error) {
        const body = {};
        body['message'] = error.message;
        body['meta'] = error.meta || undefined;
        return body;
    }

    error_handler(error, response) {
        // if(process.env.DEBUG_ERROR = true){
        if(true){
            console.error(error);
        }
        return response.status(error.status_code || 500).send(this.build_error_response(error));
    }
}

module.exports = ExceptionHandling;