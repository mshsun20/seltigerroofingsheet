import express from "express";
import { unifiedAuthProtect } from "../middlewares/auth.js";
import Enquiry from "../handlers/enquiry.js";
import fileUpload from "../middlewares/fileUpload.js";

const enquiryRouter = express.Router()

enquiryRouter.post('/', fileUpload.single('attachment'), Enquiry.create)
enquiryRouter.get('/', unifiedAuthProtect, Enquiry.read)
enquiryRouter.delete('/delete', unifiedAuthProtect, Enquiry.remove)

export default enquiryRouter;