const path = require('path');
const HomeController = require(path.resolve('./modules/home/home.controller'));
const HomeControllerObj = new HomeController();

module.exports = function (router) {
    router.get('/', (...args) => { HomeControllerObj.index(...args) });
};