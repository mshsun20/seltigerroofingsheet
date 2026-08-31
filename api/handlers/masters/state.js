import {
    createFunction,
    readFunction,
    readByIdFunction,
    readByCodeFunction,
    updateFunction,
    removeFunction,
} from "../../controllers/masters/state.js";
import { mapValidObjectId } from "../../services/objectValidationService.js";


const create = async (req, res) => {
    try {
        const statePayload = req.body;
        const existingState = await readByCodeFunction(statePayload.code);
        if (existingState) {
            const updatedState = await updateFunction(statePayload, existingState?._id);
            if (!updatedState) return res.status(401).json({ success: false, message: `State details update failed.` });
            return res.status(201).json({ success: true, message: `State details updated successfully.`, data: updatedState });
        }
        const newState = await createFunction(statePayload);
        if (!newState) return res.status(401).json({ success: false, message: `New State details creation failed.` });
        return res.status(201).json({ success: true, message: `New State details updated successfully.`, data: newState });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const states = await readFunction();
        return res.status(200).json({ success: true, message: `All States details fetched.`, data: states });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const state = await readByIdFunction(id);
        return res.status(200).json({ success: true, message: `State details fetched successfully.`, data: state });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const update = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const statePayload = req.body;
        const updatedState = await updateFunction(statePayload, id);
        if (!updatedState) return res.status(401).json({ success: false, message: `State details update failed.` });
        return res.status(201).json({ success: true, message: `State details updated successfully.`, data: updatedState })
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = mapValidObjectId(req.params.id || null);
        const removedState = await removeFunction(id);
        if (!removedState) return res.status(400).json({ success: false, message: `State details removal failed.` });
        return res.status(200).json({ success: true, message: `State details removed successfully.`, data: removedState });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

const State = {
    create, read, readById, update, remove
}

export default State;