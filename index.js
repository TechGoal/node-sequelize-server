const path = require('path');
const bodyParser = require('body-parser');
const configFile = require(path.resolve('./config/config'))[process.env.NODE_ENV];
const express = require('express');
const expressRouter = express.Router();
const app = express();

// SETUP CONFIGURATION IN ENV VARIABLES
const setupConfigs = function() {
    return new Promise((resolve, reject) => {
        for (const key in configFile) {
            process.env[key] = configFile[key];
        }
        return resolve();
    });
};


// PROCESS TO SETUP ALL ROUTES
const setupRoutes = function() {
    return new Promise((resolve, reject) => {
        const resisterRoutesPromise = require(path.resolve('./routes')).registerRoutes(expressRouter);
        resisterRoutesPromise.then((routerInstance) => {
            return resolve(routerInstance);
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
const setupServer = async function() {
    try {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true,
        }));

        await setupConfigs();
        await setupSequelize();
        const expressRouter = await setupRoutes();


        app.use('/api/', expressRouter);
        app.listen(process.env.serverPort);

        console.info(`SERVER STARTED ON PORT ${process.env.serverPort}!`);
    } catch (error) {
        console.error(error);
    }
};

// INITIATE
setupServer();
