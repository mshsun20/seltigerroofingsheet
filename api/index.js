import express from 'express';
import os from 'os';
import cluster from 'cluster';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import mongoConn from './db/dbcon.js';
import authRouter from "./routes/auth.js";
import accountRouter from "./routes/account.js";
import roleRouter from "./routes/masters/role.js";
import departmentRouter from "./routes/masters/department.js";
import permissionRouter from "./routes/masters/permission.js";
import productRouter from "./routes/masters/product.js";
import stateRouter from "./routes/masters/state.js";
import subcategoryRouter from "./routes/masters/subcategory.js";
import blogRouter from './routes/admin/blogs.js';
import fileRouter from './routes/file.js';
// Load environment variables from .env file
dotenv.config({ quiet: true });

// Determine the number of worker processes to spawn
const numCPUs = Math.ceil(os.cpus().length / Math.ceil(os.cpus().length / 2)); // Use half of the available CPUs

const app = express();
const apienv = process.env.NODE_ENV || 'development';

const portDetails = {
    production: process.env.PORT_PRD || 5050,
    quality: process.env.PORT_QAS || 5051,
    development: process.env.PORT_DEV || 5052,
}
const port = portDetails[apienv] || 5052;

const allowedOrigins = {
    production: [process.env.APP_URL_PRD, process.env.ADMIN_URL_PRD],
    quality: [process.env.APP_URL_QAS, process.env.ADMIN_URL_QAS],
    development: [process.env.APP_URL_DEV, process.env.ADMIN_URL_DEV],
}
const origins = allowedOrigins[apienv] || ['http://localhost:3052'];


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} running...`);
    (async () => {
        // CONNECT DATABASE FIRST
        await mongoConn();

        // START WORKERS
        for (let i = 0; i < numCPUs; i++) cluster.fork();
    })();
}
else {
    // Trust Apache proxy
    app.set("trust proxy", "loopback"); // or simply: app.set("trust proxy", 1);

    // Debug route to verify IP + UA
    app.get("/api/debug/ip", (req, res) => {
        res.json({
            ip: req.ip,
            ips: req.ips,
            xff: req.headers["x-forwarded-for"],
            ua: req.get("user-agent"),
            proto: req.protocol
        });
    });

    // Middleware    
    app.use(cors({
        origin: origins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200
    }));
    app.use(express.json({ limit: '10000mb' }));
    app.use(express.urlencoded({ limit: '10000mb', extended: true }));
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: '10000mb' }));
    app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));

    // static routes
    app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

    // routers
    app.use('/api/auth', authRouter);
    app.use('/api/accounts', accountRouter);
    app.use('/api/roles', roleRouter);
    app.use('/api/departments', departmentRouter);
    app.use('/api/permissions', permissionRouter);
    app.use('/api/products', productRouter);
    app.use('/api/states', stateRouter);
    app.use('/api/subcategories', subcategoryRouter);
    app.use('/api/blogs', blogRouter);
    app.use('/api/files', fileRouter);

    // UI Static Serving
    if (['quality', 'production'].includes(apienv)) {    
        // =========================
        // 2. Admin UI
        // =========================
        const adminDistPath = path.join(__dirname, "..", "admin", "dist");
        // Serve Admin static assets
        app.use( "/admin", express.static(adminDistPath));
        // Admin SPA fallback
        app.get(/^\/admin(?:\/.*)?$/, (_, res) => {
            res.sendFile(path.join(adminDistPath, "index.html"));
        });
        
        // =========================
        // 1. User UI
        // =========================
        const frontendDistPath = path.join(__dirname, "..", "app", "dist");
        // Serve User frontend static assets
        app.use(express.static(frontendDistPath));
        // User frontend SPA fallback
        app.get(/^\/(?!api|admin)(.*)$/, (_, res) => {
            res.sendFile(path.join(frontendDistPath, "index.html"));
        });
    }

    // ping
    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to the SEL Tiger Roofing Sheet API!" });
    });

    (async () => {
        await mongoConn();
        
        app.listen(port, () => {
            console.log(`Worker ${process.pid}: ${apienv.toUpperCase()} Server running on port ${port}`);
            if (apienv === 'development') {
                console.log(`Worker ${process.pid}: ${apienv.toUpperCase()} Accepting requests from: ${origins[0]}`);
            }
        });
    })();
}