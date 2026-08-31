import {
    createFunction,
    readFunction,
    readByIdFunction,
    updateFunction,
    removeFunction
} from "../../controllers/masters/permission.js";

const create = async (req, res) => {
    try {
        const payload = req.body;
        const user = req.user;
        const permission = await createFunction(payload, user);
        res.status(201).json({
            success: true,
            message: 'Permission created successfully',
            data: permission
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const permissions = await readFunction();
        res.status(200).json({
            success: true,
            message: 'All permissions retrieved successfully',
            data: permissions
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const permission = await readByIdFunction(id);
        res.status(200).json({
            success: true,
            message: 'Permission retrieved successfully',
            data: permission
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const update = async (req, res) => {
    try {
        const payload = req.body;
        const id = req.params.id;
        const user = req.user;
        const permission = await updateFunction(payload, id, user);
        res.status(201).json({
            success: true,
            message: 'Permission updated successfully',
            data: permission
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const permission = await removeFunction(id);
        res.status(200).json({
            success: true,
            message: 'Permission deleted successfully',
            data: permission
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const Permission = {
    create,
    read,
    readById,
    update,
    remove
}

export default Permission;