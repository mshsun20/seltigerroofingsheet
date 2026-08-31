import mongoose from "mongoose";
const { Schema, model } = mongoose

const stateSchema = new Schema({
    code: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    country: { type: String, trim: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true })

const State = model('State', stateSchema)

export default State