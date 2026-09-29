const dotenv = require("dotenv")
dotenv.config({ quiet: true })

const apienv = process.env.NODE_ENV || 'development';

const apiName = {
    production: process.env.API_NAME_PRD,
    quality: process.env.API_NAME_QAS,
    development: process.env.API_NAME_DEV,
}
const portDetails = {
    production: process.env.PORT_PRD,
    quality: process.env.PORT_QAS,
    development: process.env.PORT_DEV,
}

module.exports = {
    apps: [
        {
            name: apiName[apienv] || "seltigerroofingsheets-dev-api",
            script: "index.js",
            env: {
                PORT: portDetails[apienv] || 5052,
                NODE_ENV: apienv || "development",
            }
        }
    ]
};
