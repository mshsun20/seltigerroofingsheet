import Department from '../../models/masters/department.js';


// reusable functions


// handler functions
export const createFunction = async (payload, user) => {
    Object.assign(payload, { createdBy: user?._id || null });
    const newDepartment = new Department(payload);
    await newDepartment.save();
    return newDepartment;
}
export const readFunction = async () => {
    const departments = await Department.find()
    .populate(['createdBy', 'updatedBy']).sort('-updatedAt');
    return departments;
}
export const readByIdFunction = async (id) => {
    const department = await Department.findById(id)
    .populate(['createdBy', 'updatedBy']);
    return department;
}
export const updateFunction = async (payload, id, user) => {
    Object.assign(payload, { updatedBy: user?._id || null });
    const department = await Department.findByIdAndUpdate(id, payload, { returnDocument: "after" });
    return department;
}
export const removeFunction = async (id) => {
    const department = await Department.findByIdAndDelete(id);
    return department;
}