import Role from '../../models/masters/role.js';

// reusable functions

// handler functions
export const createFunction = async (payload, user) => {
    Object.assign(payload, { createdBy: user?._id || null });
    const newRole = new Role(payload);
    await newRole.save();
    return newRole;
}
export const readFunction = async () => {
    const roles = await Role.find();
    return roles;
}
export const readByIdFunction = async (id) => {
    const role = await Role.findById(id);
    return role;
}
export const updateFunction = async (payload, id, user) => {
    Object.assign(payload, { updatedBy: user?._id || null });
    const role = await Role.findByIdAndUpdate(id, payload, { returnDocument: "after" });
    return role;
}
export const removeFunction = async (id) => {
    const role = await Role.findByIdAndDelete(id);
    return role;
}