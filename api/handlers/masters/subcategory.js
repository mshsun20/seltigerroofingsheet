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
        const subcategoryPayload = req.body;
        const existingSubcategory = await readByCodeFunction(subcategoryPayload.code);
        if (existingSubcategory) {
            const updatedSubcategory = await updateFunction(subcategoryPayload, existingSubcategory?._id);
            if (!updatedSubcategory) return res.status(401).json({ success: false, message: `Subcategory details update failed.` });
            return res.status(201).json({ success: true, message: `Subcategory details updated successfully.`, data: updatedSubcategory });
        }
        const newSubcategory = await createFunction(subcategoryPayload);
        if (!newSubcategory) return res.status(401).json({ success: false, message: `New Subcategory details creation failed.` });
        return res.status(201).json({ success: true, message: `New Subcategory details updated successfully.`, data: newSubcategory });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const subcategories = await readFunction();
        return res.status(200).json({ success: true, message: `All Subcategories details fetched.`, data: subcategories });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const subcategory = await readByIdFunction(id);
        return res.status(200).json({ success: true, message: `Subcategory details fetched successfully.`, data: subcategory });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const update = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const subcategoryPayload = req.body;
        const updatedSubcategory = await updateFunction(subcategoryPayload, id);
        if (!updatedSubcategory) return res.status(401).json({ success: false, message: `Subcategory details update failed.` });
        return res.status(201).json({ success: true, message: `Subcategory details updated successfully.`, data: updatedSubcategory })
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const removedSubcategory = await removeFunction(id);
        if (!removedSubcategory) return res.status(400).json({ success: false, message: `Subcategory details removal failed.` });
        return res.status(200).json({ success: true, message: `Subcategory details removed successfully.`, data: removedSubcategory });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

const Subcategory = {
    create, read, readById, update, remove
}

export default Subcategory;