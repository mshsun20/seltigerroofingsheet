import {
    createFunction,
    readFunction,
    readByIdFunction,
    updateFunction,
    removeFunction
} from "../controllers/account.js";
import { mapValidObjectId } from "../services/objectValidationService.js";

const create = async (req, res) => {
    try {
        const payload = req.body;
        // console.log(payload);
        const user = req.user;
        const account = await createFunction(payload, user);
        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: account
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const read = async (req, res) => {
    try {
        const search = req.query.search || "";
        const role = mapValidObjectId(req.query.role || null);
        const status = req.query.status || "";
        const accounts = await readFunction({ search, role, status });
        res.status(200).json({
            success: true,
            message: 'All accounts retrieved successfully',
            data: accounts,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await readByIdFunction(id);
        res.status(200).json({
            success: true,
            message: 'Account retrieved successfully',
            data: account
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
        const account = await updateFunction(payload, id, user);
        res.status(201).json({
            success: true,
            message: 'Account updated successfully',
            data: account
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await removeFunction(id);
        res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
            data: account
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const Account = {
    create,
    read,
    readById,
    update,
    remove
}

export default Account;