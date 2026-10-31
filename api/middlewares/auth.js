import Account from "../models/account.js";
import { verifyAccessToken } from "../services/tokenProcessingService.js";

const username = process.env.APP_API_USR || 'digitalapi'
const password = process.env.APP_API_PSS || 'Shyam@12345'

// export const basicAuth = async (req, res, next) => {
//     const method = req.method;
//     const contentType = req.headers['content-type'] || '';
//     const accept = req.headers['accept'] || '';
//     const xRequestedWith = req.headers['x-requested-with'] || '';
//     const authHeader = req.headers.authorization;

//     // ✅ All headers checks
//     if (
//         !accept.toLowerCase().includes('application/json') ||
//         xRequestedWith.toLowerCase() !== 'x' ||
//         (['POST', 'PUT', 'PATCH'].includes(method) && !contentType.toLowerCase().includes('application/json'))
//     ) {
//         return res.status(401).json({ success: false, message: 'Invalid or missing headers' });
//     }

//     // ✅ Authorization must be present
//     if (!authHeader) {
//         return res.status(401).json({ success: false, message: 'Authorization header missing!' });
//     }

//     const [scheme, credentials] = authHeader.split(' ');
//     if (scheme !== 'Basic' || !credentials) {
//         return res.status(401).json({ success: false, message: 'Invalid authorization format!' });
//     }

//     // ✅ Decode credentials
//     const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
//     const [user, pass] = decodedCredentials.split(':');
    
//     const adminDtl = await Account.findOne({ username: "smetalics1" })
//         .populate([ 'role', 'createdBy', 'updatedBy' ]).lean();

//     // ✅ Compare against actual env values
//     if (user === username && pass === password) {
//         req.user = adminDtl; // Dummy user ID for basic auth
//         return next();
//     } else {
//         return res.status(403).json({ success: false, message: 'Forbidden ..!' });
//     }
// };


// export const jwtHybrdProtect = async (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });

//     try {
//         const decoded = verifyAccessToken(token);
//         if (!decoded || !decoded.sessacc) {
//             return res.status(403).json({ success: false, message: 'Invalid token' });
//         }
//         const userDtl = await Account.findById(decoded.sessacc).select(['-password', '-passwordBackup']).populate([ 'role', 'createdBy', 'updatedBy' ]).lean();
//         req.user = userDtl;
//         next();
//     } catch {
//         res.status(403).json({ success: false, message: 'Invalid or expired token' });
//     }
// };

export const basicAuth = async (req, res, next) => {
    const method = req.method;
    const contentType = req.headers['content-type'] || '';
    const accept = req.headers['accept'] || '';
    const xRequestedWith = req.headers['x-requested-with'] || '';
    const authHeader = req.headers.authorization;

    console.log(method);
    console.log(contentType);
    console.log(accept);
    console.log(xRequestedWith);
    console.log(authHeader);

    // ✅ All headers checks
    if (
        !accept.toLowerCase().includes('application/json')
        || xRequestedWith.toLowerCase() !== 'x'
        || (
            ['POST', 'PUT', 'PATCH'].includes(method)
            && !contentType.toLowerCase().includes('application/json')
        )
    ) {
        return res.status(401).json({ success: false, message: 'Invalid or missing headers' });
    }

    // ✅ Authorization must be present
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authorization header missing!' });
    }

    const [scheme, credentials] = authHeader.split(' ');
    if (scheme !== 'Basic' || !credentials) {
        return res.status(401).json({ success: false, message: 'Invalid authorization format!' });
    }

    // ✅ Decode credentials
    const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
    const [user, pass] = decodedCredentials.split(':');
    
    const adminDtl = await Account.findOne({ username: "smetalicsSA" })
        .populate(['department', 'role', 'permission', 'createdBy', 'updatedBy'])
        .lean();

    // ✅ Compare against actual env values
    if (user === username && pass === password) {
        req.user = adminDtl;
        req.auth = {
            type: "basic",
            userId: adminDtl?._id,
        };

        console.log("Basic Auth used");
        return next();
    } else {
        return res.status(403).json({ success: false, message: 'Forbidden ..!' });
    }
};

export const jwtHybridProtect = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized",
        });
    }

    try {
        const decoded = verifyAccessToken(token);
        if (!decoded || !decoded.sessacc) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
            });
        }

        const userDtl = await Account.findById(decoded.sessacc)
            .select(["-password", "-passwordBackup"])
            .populate(['department', 'role', 'permission', 'createdBy', 'updatedBy'])
            .lean();

        if (!userDtl) {
            return res.status(401).json({
                success: false,
                message: "User account not found",
            });
        }

        req.user = userDtl;
        req.auth = {
            type: "jwt",
            userId: userDtl._id,
        };

        console.log("JWT Hybrid Protect used");
        return next();
    } catch {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


// =================================================================================================
// THE UNIFIED AUTH PROTECTOR
// =================================================================================================

export const unifiedAuthProtect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    // --------------------------------------------
    // Bearer API Key
    // --------------------------------------------
    if (authHeader && /^Bearer\s+/i.test(authHeader)) {
        return bearerApiKeyProtect(req, res, next);
    }

    // --------------------------------------------
    // Basic Authentication
    // --------------------------------------------
    if (authHeader && /^Basic\s+/i.test(authHeader)) {
        return basicAuth(req, res, next);
    }

    // --------------------------------------------
    // JWT Cookie
    // --------------------------------------------
    if (req.cookies?.access_token) {
        return jwtHybridProtect(req, res, next);
    }

    return res.status(401).json({
        success: false,
        message: "Authentication required",
    });
};