import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active' },
    createdBy: { type: Types.ObjectId, ref: 'Account' },
    updatedBy: { type: Types.ObjectId, ref: 'Account' }
}, { timestamps: true });

const Department = model('Department', DepartmentSchema);

export default Department;