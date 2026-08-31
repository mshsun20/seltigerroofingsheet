import {
    createFunction,
    readFunction,
    readByIdFunction,
    updateFunction,
    removeFunction
} from "../../controllers/masters/role.js";

const create = async (req, res) => {
    try {
        const payload = req.body;
        const user = req.user;
        const role = await createFunction(payload, user);
        res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: role
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const roles = await readFunction();
        res.status(200).json({
            success: true,
            message: 'Roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await readByIdFunction(id);
        res.status(200).json({
            success: true,
            message: 'Role retrieved successfully',
            data: role
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
        const role = await updateFunction(payload, id, user);
        res.status(201).json({
            success: true,
            message: 'Role updated successfully',
            data: role
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await removeFunction(id);
        res.status(200).json({
            success: true,
            message: 'Role deleted successfully',
            data: role
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const Role = {
    create,
    read,
    readById,
    update,
    remove
}

export default Role;