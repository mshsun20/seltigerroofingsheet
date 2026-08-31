import Product from "../../models/masters/product.js";

// Controller logics
export const createFunction = async (payload) => {
    const newProduct = await Product.create(payload)
    if (newProduct) return newProduct;
}

export const readFunction = async () => {
    const productDetails = await Product.find().lean()
    return productDetails;
}

export const readByIdFunction = async (id) => {
    const productDetails = await Product.findById(id);
    return productDetails;
}

export const readByCodeFunction = async (code) => {
    const productDetails = await Product.findOne({ code });
    return productDetails;
}

export const updateFunction = async (payload, id) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        payload,
        { returnDocument: "after" }
    )
    if (updatedProduct) return updatedProduct;
}

export const removeFunction = async (id) => {
    const removedProduct = await Product.findByIdAndDelete(id);
    if (removedProduct) return removedProduct;
}
