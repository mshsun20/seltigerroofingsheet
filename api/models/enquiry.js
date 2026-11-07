import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const enquirySchema = new Schema({
    wbEnquiryNo: { type: String, required: true, trim: true },
    leadId: { type: String, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    pinCode: { type: String, trim: true },
    state: { type: String, trim: true },
    district: { type: String, trim: true },
    block: { type: String, trim: true },
    location: { type: String, trim: true },
    city: { type: String, trim: true },
    purpose: { type: String, required: true, trim: true },
    customerType: { type: String, required: true, trim: true },
    subType: { type: String, trim: true },
    source: { type: String, required: true, trim: true },
    vertical: { type: String, trim: true },
    product: { type: String, trim: true },
    subProducts: [{ type: String, trim: true }],
    spec: { type: String, trim: true },
    qty: { type: String, trim: true },
    uom: { type: String, trim: true },
    requirement: { type: String, trim: true },
    territory: { type: String, trim: true },
    why: { type: String, trim: true },
    jobDescription: { type: String, trim: true },
    remarks: { type: String, trim: true },
    privacyAccepted: { type: Boolean, required: true },
    attachment: { type: Types.ObjectId, ref: 'File' },
    status: { type: String, required: true, enum: ["Pending", "In Progress", "Resolved", "Rejected"], default: "Pending" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date },
}, { timestamps: true })

const Enquiry = model('Enquiry', enquirySchema)

export default Enquiry