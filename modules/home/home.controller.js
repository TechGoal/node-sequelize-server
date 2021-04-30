const path = require('path');
const Controller = require(path.resolve('./core/controller'));

class HomeController {
    constructor() {}

    static index(req, res) {
        try {
            console.log('Herte')
            return res.status(200).send('Working');
        } catch (error) {
            console.err(error);
        }
    }
};

module.exports = {
    HomeController
}
