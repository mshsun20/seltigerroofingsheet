import Permission from '../../models/masters/permission.js';
import asciiGenerator from "../../services/asciiGenrator.js";

// reusable functions
const createId = (payload) => {
    return `access${asciiGenerator(payload)}`
}

// handler functions
export const createFunction = async (payload, user) => {
    const permissionId = createId(payload.name)
    Object.assign(payload, { permissionId, createdBy: user?._id || null });
    const newPermission = new Permission(payload);
    await newPermission.save();
    return newPermission;
}
export const readFunction = async () => {
    const permissions = await Permission.find();
    return permissions;
}
export const readByIdFunction = async (id) => {
    const permission = await Permission.findById(id);
    return permission;
}
export const updateFunction = async (payload, id, user) => {
    Object.assign(payload, { updatedBy: user?._id || null });
    const permission = await Permission.findByIdAndUpdate(id, payload, { returnDocument: "after" });
    return permission;
}
export const removeFunction = async (id) => {
    const permission = await Permission.findByIdAndDelete(id);
    return permission;
}