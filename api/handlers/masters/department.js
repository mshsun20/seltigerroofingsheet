import {
    createFunction,
    readFunction,
    readByIdFunction,
    updateFunction,
    removeFunction
} from "../../controllers/masters/department.js";
// import 

const create = async (req, res) => {
    try {
        const payload = req.body;
        const user = req.user;
        const department = await createFunction(payload, user);
        res.status(201).json({
            success: true,
            message: 'Department created successfully',
            data: department
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const departments = await readFunction();
        res.status(200).json({
            success: true,
            message: 'All departments retrieved successfully',
            data: departments,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const department = await readByIdFunction(id);
        res.status(200).json({
            success: true,
            message: 'Department retrieved successfully',
            data: department
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
        const department = await updateFunction(payload, id, user);
        res.status(201).json({
            success: true,
            message: 'Department updated successfully',
            data: department
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const department = await removeFunction(id);
        res.status(200).json({
            success: true,
            message: 'Department deleted successfully',
            data: department
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const Department = {
    create,
    read,
    readById,
    update,
    remove
}

export default Department;