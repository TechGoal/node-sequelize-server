const path = require('path');
const bodyParser = require('body-parser');
const configFile = require(path.resolve('./config/config'))[process.env.NODE_ENV];
const express = require('express');
const app = express();

// SETUP CONFIGURATION IN ENV VARIABLES
const setupConfigs = function() {
    return new Promise((resolve, reject) => {
        let errorFlag = false;
        for (const key in configFile) {
            if (Object.prototype.hasOwnProperty.call(configFile, key)) {
                process.env[key] = configFile[key];
            } else {
                errorFlag = true;
                return;
            }
        }
        if (errorFlag) {
            return reject(new Error('Found config issue, missing attribute'));
        }
        return resolve();
    });
};


// PROCESS TO SETUP ALL ROUTES
const setupRoutes = function() {
    return new Promise((resolve, reject) => {
        const resisterRoutesPromise = require(path.resolve('./routes')).registerRoutes(app);
        resisterRoutesPromise.then(() => {
            return resolve();
        }).catch((err) => {
            return reject(err);
        });
    });
};


// CONNECT TO SEQUELIZE DATABASE AND REGISTER ALL MODELS
const setupSequelize = function() {
    return new Promise((resolve, reject) => {
        require(path.resolve('./models/index'));
        return resolve();
    });
};


// MAIN FUNCTION TO SETUP THE SERVER AND ALL IT'S DEPENDENCIES
const setupServer = function() {
    const setupConfigsPromise = setupConfigs();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    setupConfigsPromise.then(() => {
        const setupSequelizePromise = setupSequelize();
        setupSequelizePromise.then(() => {
            const setupRoutesPromise = setupRoutes();
            setupRoutesPromise.then(() => {
                app.listen(process.env.serverPort);
                console.log(`SERVER STARTED ON PORT ${process.env.serverPort}!`);
            });
        });
    });
};

// INITIATE
setupServer();
