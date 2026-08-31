import {
    createFunction,
    readFunction,
    readByIdFunction,
    readByCodeFunction,
    updateFunction,
    removeFunction,
} from "../../controllers/masters/product.js";
import { mapValidObjectId } from "../../services/objectValidationService.js";


const create = async (req, res) => {
    try {
        const productPayload = req.body;
        const existingProduct = await readByCodeFunction(productPayload.code);
        if (existingProduct) {
            const updatedProduct = await updateFunction(productPayload, existingProduct?._id);
            if (!updatedProduct) return res.status(401).json({ success: false, message: `Product details update failed.` });
            return res.status(201).json({ success: true, message: `Product details updated successfully.`, data: updatedProduct });
        }
        const newProduct = await createFunction(productPayload);
        if (!newProduct) return res.status(401).json({ success: false, message: `New Product details creation failed.` });
        return res.status(201).json({ success: true, message: `New Product details updated successfully.`, data: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const products = await readFunction();
        return res.status(200).json({ success: true, message: `All Products details fetched.`, data: products });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const product = await readByIdFunction(id);
        return res.status(200).json({ success: true, message: `Product details fetched successfully.`, data: product });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const update = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const productPayload = req.body;
        const updatedProduct = await updateFunction(productPayload, id);
        if (!updatedProduct) return res.status(401).json({ success: false, message: `Product details update failed.` });
        return res.status(201).json({ success: true, message: `Product details updated successfully.`, data: updatedProduct })
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const removedProduct = await removeFunction(id);
        if (!removedProduct) return res.status(400).json({ success: false, message: `Product details removal failed.` });
        return res.status(200).json({ success: true, message: `Product details removed successfully.`, data: removedProduct });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

const Product = {
    create, read, readById, update, remove
}

export default Product;