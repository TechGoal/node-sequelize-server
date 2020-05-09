const fs = require('fs');
const path = require('path');
const routesFolder = path.resolve('./routes');


// HELPER FUNCTION TO GET ALL ROUTES PATH
const getAllRoutesPath = function() {
    const allRoutesPath = [];
    fs.readdirSync(routesFolder).forEach((file) => {
        const fullPath = `${routesFolder}/${file}`;
        if (fs.existsSync(fullPath)) {
            fs.readdirSync(fullPath).forEach((nestedfile) => {
                const routePath = `${fullPath}/${nestedfile}`.replace('.js', '');
                allRoutesPath.push(routePath);
            });
        }
    });
    return allRoutesPath;
};


// MAIN FUNCTION TO REGISTER ALL ROUTES
const registerRoutes = function(expressInstance) {
    return new Promise((resolve, reject) => {
        const allRoutes = [];
        const allRoutesPath = getAllRoutesPath();

        // LOAD ALL NESTED ROUTES FILE
        allRoutesPath.map((routeFile) => {
            const routeArray = require(routeFile);
            if (routeArray.length) {
                allRoutes.push(...routeArray);
            }
        });

        // REGISTER ALL ROUTES
        allRoutes.map((route) => {
            const policy = route.policy || [];
            if (route.method.toLowerCase() == 'post') {
                expressInstance.post(route.url, policy, route.controller);
            } else if (route.method.toLowerCase() == 'get') {
                expressInstance.get(route.url, policy, route.controller);
            } else if (route.method.toLowerCase() == 'put') {
                expressInstance.put(route.url, policy, route.controller);
            } else if (route.method.toLowerCase() == 'patch') {
                expressInstance.patch(route.url, policy, route.controller);
            } else if (route.method.toLowerCase() == 'delete') {
                expressInstance.delete(route.url, policy, route.controller);
            }
        });
        return resolve();
    });
};

module.exports = {
    registerRoutes,
};
