import mongoose from "mongoose";
const { Schema, model } = mongoose;

const enquirySchema = new Schema({
    enquiryNo: { type: String, required: true, trim: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, required: true, enum: ['Open', 'Prospective', 'Active', 'Inactive', 'Closed'], default: 'Open', index: true },
}, { timestamps: true })

const Enquiry = model('Enquiry', enquirySchema)

export default Enquiry