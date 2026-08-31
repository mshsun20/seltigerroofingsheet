import mongoose from "mongoose";
const { Schema, model } = mongoose

const subcategorySchema = new Schema({
    code: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true })

const Subcategory = model('Subcategory', subcategorySchema)

export default Subcategory