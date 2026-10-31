import {
    createFunction,
    readFunction,
    readByIdFunction,
    readByUniqueFunction,
    updateFunction,
    deleteFunction
} from "../controllers/enquiry.js";
import { idValidator } from "../utilities/idValidator.js";
import crypto from "crypto";

// Reusables Functions

// Controller logics
const create = async (req, res) => {
    try {
        const enquiryPayload = req.body
        // console.log(enquiryPayload);
        Object.assign(enquiryPayload, { enquiryNo: crypto.randomUUID() });
        const existingEnquiry = await readByUniqueFunction(enquiryPayload?.enquiryNo);
        if (!existingEnquiry) {
            const newEnquiry = await createFunction(enquiryPayload);
            if (!newEnquiry) return res.status(401).json({ message: 'Enquiry details creation failed.', success: false })
            return res.status(201).json({ message: 'Enquiry details created successfully.', success: true, data: newEnquiry })
        }
        else {
            ['_id', '__v', 'createdAt', 'updatedAt'].forEach(elm => delete enquiryPayload[elm])
            const updatedEnquiry = await updateFunction(enquiryPayload, existingEnquiry?._id);
            if (!updatedEnquiry) return res.status(401).json({ message: 'Existing Enquiry details update failed.', success: false })
            return res.status(201).json({ message: 'Existing Enquiry details updated successfully.', success: true, data: updatedEnquiry })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.', success: false, data: error });
    }
}

const read = async (req, res) => {
    try {
        const enquiryDetails = await readFunction();
        return res.status(200).json({ message: 'All Enquiry details fetched successfully.', success: true, data: enquiryDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.', success: false, data: error });
    }
}

const remove = async (req, res) => {
    try {
        const id = idValidator(req.query.id || '')
        if (id === null) return res.status(400).json({ message: 'Received Id is Invalid.', success: false });
        const removedEnquiry = await deleteFunction(id);
        if (!removedEnquiry) return res.status(400).json({ message: 'Enquiry details removal failed.', success: false });
        return res.status(200).json({ message: 'Enquiry details removed successfully.', success: true, data: removedEnquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.', success: false, data: error });
    }
}

const Enquiry = {
    create,
    read,
    remove
};
export default Enquiry;