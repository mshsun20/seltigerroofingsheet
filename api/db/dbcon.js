// import dotenv from 'dotenv';
// dotenv.config({ quiet: true });
// import mongoose from 'mongoose';

// const dbUrlConn = process.env.ONLN_DBURL
// // const dbUrlConn = process.env.OFFLN_DBURL
// const appenv = process.env.APP_ENV || 'quality';
// const env = process.env.NODE_ENV || 'dev';

// const dbUrl = appenv === 'production'
//     ? (env === 'live' ? (console.log('Live (Production Server)'), `${dbUrlConn}seltigerroofingsheetprddb?appName=seltigerroofingsheetapp`) : (console.log('Dev (Production Server)'), `${dbUrlConn}seltigerroofingsheetdb?appName=seltigerroofingsheetapp`))
//     : (env === 'live' ? (console.log('Live (Quality Server)'), `${dbUrlConn}seltigerroofingsheetqasdb?appName=seltigerroofingsheetapp`) : (console.log('Dev (Quality Server)'), `${dbUrlConn}seltigerroofingsheetdb?appName=seltigerroofingsheetapp`));

// const dbnm = appenv === 'production'
//     ? (env === 'live' ? (console.log('Live (Production Server)'), 'seltigerroofingsheetprddb') : (console.log('Dev (Production Server)'), 'seltigerroofingsheetdb'))
//     : (env === 'live' ? (console.log('Live (Quality Server)'), 'seltigerroofingsheetqasdb') : (console.log('Dev (Quality Server)'), 'seltigerroofingsheetdb'));


// mongoose.set('strictQuery', false); // Disable strict query mode

// const mongoConn = async () => {
//     try {
//         await mongoose.connect(dbUrl, {
//             dbName: dbnm,
//             retryWrites: true,
//             w: 'majority',
//             ssl: true,
//             maxPoolSize: 1, // Keep per-worker connections low
//             minPoolSize: 1
//         });
//         console.log(`Worker ${process.pid}: DB Successfully Connected...`);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database connection failed');
//     }
// }

// export default mongoConn;




import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import mongoose from 'mongoose';

const apienv = process.env.NODE_ENV || 'development';

const dbUrlConn = {
    production: process.env.ONLN_DBURL_PRD,
    quality: process.env.ONLN_DBURL_QAS,
    development: process.env.ONLN_DBURL_DEV,
}

// db switching based on environment
let dbUrl = '', dbnm = '';
switch (apienv) {
    case 'production':
        dbUrl = `${dbUrlConn[apienv]}`;
        dbnm = 'seltigerroofingsheetprddb';
        console.log('Connecting to Production Database...');
        break;
    case 'quality':
        dbUrl = `${dbUrlConn[apienv]}`;
        dbnm = 'seltigerroofingsheetqasdb';
        console.log('Connecting to Quality Database...');
        break;
    case 'development':
        dbUrl = `${dbUrlConn[apienv]}seltigerroofingsheetdb?appName=shyamdsdapp`;
        dbnm = 'seltigerroofingsheetdb';
        console.log('Connecting to Development Database...');
        break;
    default:
        dbUrl = `${dbUrlConn[apienv]}seltigerroofingsheetdb?appName=shyamdsdapp`;
        dbnm = 'seltigerroofingsheetdb';
        console.log('Unknown environment. Connecting to Development Database by default...');
        break;
}

// console.log(dbUrl);

mongoose.set('strictQuery', false); // Disable strict query mode

const mongoConn = async () => {
    try {
        await mongoose.connect(dbUrl, {
            dbName: dbnm,
            retryWrites: true,
            w: 'majority',
            // ssl: true,
            // maxPoolSize: 1, // Keep per-worker connections low
            // minPoolSize: 1
        });
        console.log(`Worker ${process.pid}: DB Successfully Connected...`);
    } catch (error) {
        console.error(error);
        throw new Error('Database connection failed');
    }
}

export default mongoConn;