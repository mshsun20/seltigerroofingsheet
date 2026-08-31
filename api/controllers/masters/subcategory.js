import Subcategory from "../../models/masters/subcategory.js";

// Controller logics
export const createFunction = async (payload) => {
    const newSubcategory = await Subcategory.create(payload)
    if (newSubcategory) return newSubcategory;
}

export const readFunction = async () => {
    const subcategoryDetails = await Subcategory.find().lean()
    return subcategoryDetails;
}

export const readByIdFunction = async (id) => {
    const subcategoryDetails = await Subcategory.findById(id);
    return subcategoryDetails;
}

export const readByCodeFunction = async (code) => {
    const subcategoryDetails = await Subcategory.findOne({ code });
    return subcategoryDetails;
}

export const updateFunction = async (payload, id) => {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        id,
        payload,
        { returnDocument: "after" }
    )
    if (updatedSubcategory) return updatedSubcategory;
}

export const removeFunction = async (id) => {
    const removedProduct = await Subcategory.findByIdAndDelete(id);
    if (removedProduct) return removedProduct;
}
