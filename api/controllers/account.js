import Account from '../models/account.js';
import {
    hashPassword
} from "../services/passwordHashService.js";
import { mapValidObjectId } from "../services/objectValidationService.js";


// handler functions
export const createFunction = async (payload, user) => {
    const pass = String(payload.password || 'sm@123');
    Object.assign(payload, {
        password: hashPassword(pass),
        passwordBackup: pass,
        department: mapValidObjectId(payload?.department) || null,
        role: mapValidObjectId(payload?.role) || null,
        permission: mapValidObjectId(payload?.permission) || null,
        createdBy: user?._id || null
    });
    const newAccount = new Account(payload);
    await newAccount.save();
    return newAccount;
}
export const readFunction = async (params) => {
    const { search, role, status } = params
    const searchCriteria = {};
    if (search && String(search).trim() !== "") {
        searchCriteria.$or = [
            { fullName: { $regex: search || '', $options: 'i' } },
            { username: { $regex: search || '', $options: 'i' } },
            { email: { $regex: search || '', $options: 'i' } },
            { phone: { $regex: search || '', $options: 'i' } },
        ]
    }
    if (role) {
        searchCriteria['role._id'] = new mongoose.Types.ObjectId(role);
    }
    if (status && String(status).trim() !== "") {
        searchCriteria.status = { $regex: `^${String(status).trim()}$` || '', $options: 'i' };
    }
    
    const pipeline = [
        { $sort: { updatedAt: -1 } },
        { $lookup: { from: 'departments', localField: 'department', foreignField: '_id', as: 'department' } },
        { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'roles', localField: 'role', foreignField: '_id', as: 'role' } },
        { $unwind: { path: '$role', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'permissions', localField: 'permission', foreignField: '_id', as: 'permission' } },
        { $unwind: { path: '$permission', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'accounts', localField: 'createdBy', foreignField: '_id', as: 'createdBy' } },
        { $unwind: { path: '$createdBy', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'accounts', localField: 'updatedBy', foreignField: '_id', as: 'updatedBy' } },
        { $unwind: { path: '$updatedBy', preserveNullAndEmptyArrays: true } },
        ...(Object.keys(searchCriteria).length > 0 ? [{ $match: searchCriteria }] : []),
        { $project: { password: 0, passwordBackup: 0 }},
    ];
    const accounts = await Account.aggregate(pipeline);
    return accounts;
}
export const readByIdFunction = async (id) => {
    const account = await Account.findById(id)
    .populate(['department', 'role', 'permission', 'createdBy', 'updatedBy']).select('-password').lean();
    return account;
}
export const updateFunction = async (payload, id, user) => {
    console.log(id);
    console.log(payload);
    const pass = String(payload.password || 'sm@123');
    Object.assign(payload, {
        password: hashPassword(pass),
        passwordBackup: pass,
        updatedBy: user?._id || null
    });
    const account = await Account.findByIdAndUpdate(id, payload, { returnDocument: "after" });
    return account;
}
export const removeFunction = async (id) => {
    const account = await Account.findByIdAndDelete(id);
    return account;
}