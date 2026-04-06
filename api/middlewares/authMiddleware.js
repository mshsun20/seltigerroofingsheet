const username = process.env.APP_API_USR || 'digitalapi'
const password = process.env.APP_API_PSS || 'Shyam@12345'

export const basicAuth = async (req, res, next) => {
    const method = req.method;
    const contentType = req.headers['content-type'] || '';
    const accept = req.headers['accept'] || '';
    const xRequestedWith = req.headers['x-requested-with'] || '';
    const authHeader = req.headers.authorization;
    const isMultipart = contentType.toLowerCase().includes('multipart/form-data');
    const isJson = contentType.toLowerCase().includes('application/json');

    // ✅ All headers checks
    if (
        !accept.toLowerCase().includes('application/json') ||
        xRequestedWith.toLowerCase() !== 'x' ||
        (['POST', 'PUT', 'PATCH'].includes(method) && !isMultipart && !isJson)
    ) {
        return res.status(401).json({ message: 'Invalid or missing headers', statuscode: 401 });
    }

    // ✅ Authorization must be present
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing!', statuscode: 401 });
    }

    const [scheme, credentials] = authHeader.split(' ');
    if (scheme !== 'Basic' || !credentials) {
        return res.status(401).json({ message: 'Invalid authorization format!', statuscode: 401 });
    }

    // ✅ Decode credentials
    const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
    const [user, pass] = decodedCredentials.split(':');

    // ✅ Compare against actual env values
    if (user === username && pass === password) {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden ..!', statuscode: 403 });
    }
};