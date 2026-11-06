import Enquiry from '../models/enquiry.js';


export const createFunction = async (payload) => {
    const data = await Enquiry.create(payload);
    return data;
}

export const createMultipleFunction = async (payload) => {
    const data = await Enquiry.insertMany(payload);
    return data;
}

export const readFunction = async () => {
    return await Enquiry.find().lean();
}

export const readByIdFunction = async (id) => {
    return await Enquiry.findById(id).lean();
}

export const readByUniqueFunction = async (key) => {
    return await Enquiry.findOne({ enquiryNo: key }).lean();
}

export const updateFunction = async (payload, id) => {
    const updatedData = await Enquiry.findByIdAndUpdate(id, payload, { returnDocument: "after" });
    return updatedData;
}

export const deleteFunction = async (id) => {
    const removalDetails = await Enquiry.findByIdAndDelete(id);
    return removalDetails;
}