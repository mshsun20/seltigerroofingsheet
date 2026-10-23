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