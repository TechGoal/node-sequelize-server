const path = require('path');
const Event = require(path.resolve('./core/event'));
const Controller = require(path.resolve('./core/controller'));

class HomeController extends Controller {
    constructor() {
        super();
    }

    async index(req, res) {
        try {            
            return res.status(200).json('Hello World');
        } catch (error) {
            return this.error_handler(error, res);
        }
    }
}

module.exports = HomeController;
