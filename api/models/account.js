import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const AccountSchema = new Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    passwordBackup: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    department: { type: Types.ObjectId, ref: 'Department' },
    employeeCode: { type: String, trim: true },
    role: { type: Types.ObjectId, ref: 'Role', required: true },
    permission: { type: Types.ObjectId, ref: 'Permission' },
    isCreator: { type: Boolean, required: true, default: true },
    isApprover: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active' },
    createdBy: { type: Types.ObjectId, ref: 'Account' },
    updatedBy: { type: Types.ObjectId, ref: 'Account' }
}, { timestamps: true });

const Account = model('Account', AccountSchema);

export default Account;