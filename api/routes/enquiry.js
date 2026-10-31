import express from "express";
import { unifiedAuthProtect } from "../middlewares/auth.js";
import Enquiry from "../handlers/enquiry.js";

const enquiryRouter = express.Router()

enquiryRouter.post('/', Enquiry.create)
enquiryRouter.get('/', unifiedAuthProtect, Enquiry.read)
enquiryRouter.delete('/delete', unifiedAuthProtect, Enquiry.remove)

export default enquiryRouter;