import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const appenv = process.env.NODE_ENV || 'development';
let accessExp, refreshExp
switch (appenv) {
    case "development":
        accessExp = String(process.env.ACCESS_EXP_DEV);
        refreshExp = String(process.env.REFRESH_EXP_DEV);
        break;
    case "quality":
        accessExp = String(process.env.ACCESS_EXP_QAS);
        refreshExp = String(process.env.REFRESH_EXP_QAS);
        break;
    case "production":
        accessExp = String(process.env.ACCESS_EXP_PRD);
        refreshExp = String(process.env.REFRESH_EXP_PRD);
        break;
}



// tokens generation
export const generateAccessToken = (user) => {
    return jwt.sign({ sessacc: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: `${accessExp}m` });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ sessacc: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: `${refreshExp}d` });
};



// tokens verification
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
