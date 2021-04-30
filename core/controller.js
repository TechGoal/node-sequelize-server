const path = require('path');
const ExceptionHandling = require(path.resolve('./core/exception'));

class Controller extends ExceptionHandling {
    constructor() {
        super();
        this.error = new Error();
    }
}

module.exports = Controller;