const path = require('path');
const homeController = require(path.resolve('./controllers/home/home.controller'));

module.exports = [
    {
        'url': '/home',
        'method': 'get',
        'policy': null,
        'controller': homeController.home,
    },
];
