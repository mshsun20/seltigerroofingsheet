import {
    createMultipleFunction,
    readFunction,
    deleteFunction
} from "../controllers/enquiry.js";
import { idValidator } from "../utilities/idValidator.js";
import { SRC_REGISTER } from "../registers/all.register.js";
import crypto from "crypto";
import moment from "moment";
import {
    newSfTokenGen
} from "../config/sfTokenGen.js";
import axios from "axios";
import { uploadSingleFile } from "../utilities/fileOperations.js";


const ENQUIRY_API_URL = String(process.env.SF_LEAD_ADD).trim();

// Reusables Functions

// Controller logics
const create = async (req, res) => {
    try {
        const enquiryPayload = req.body;
        const file = req.file;
        const uploadResult = await uploadSingleFile(file);
        
        Object.assign(enquiryPayload, {
            source: SRC_REGISTER?.find(src => src.code === "sm")?.value,
            attachment: uploadResult?.uploaded?._id || null,
            status: "Pending",
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
        })
        console.log(enquiryPayload);
        const newEnquiryPayload = [];

        if (typeof enquiryPayload?.businessRequirements !== "string" && enquiryPayload?.businessRequirements?.length > 0) {
            // console.log("x1");
            const { businessRequirements, productInterests, ...rest } = enquiryPayload
            businessRequirements?.forEach(breq => {
                newEnquiryPayload.push({
                    wbEnquiryNo: crypto.randomUUID(),
                    ...rest,
                    vertical: breq?.vertical,
                    product: breq?.product,
                    subProducts: breq?.subProducts?.length > 0 ? breq?.subProducts : [],
                    spec: breq?.spec,
                    qty: breq?.qty,
                    uom: breq?.uom,
                    requirement: breq?.requirement,
                })
            })
        }
        else if ( typeof enquiryPayload?.productInterests !== "string" && enquiryPayload?.productInterests?.length > 0) {
            // console.log("x2");
            const { businessRequirements, productInterests, ...rest } = enquiryPayload
            productInterests?.forEach(pi => {
                newEnquiryPayload.push({
                    wbEnquiryNo: crypto.randomUUID(),
                    ...rest,
                    vertical: pi?.vertical,
                    product: pi?.product,
                    subProducts: pi?.subProducts?.length > 0 ? pi.subProducts : [],
                    territory: pi?.territory,
                    why: pi?.why,
                })
            })
        }
        else {
            // console.log("x3");
            const { businessRequirements, productInterests, ...rest } = enquiryPayload
            newEnquiryPayload.push({ wbEnquiryNo: crypto.randomUUID(), ...rest })
        }
        // console.log(newEnquiryPayload);
        
        const newBearerToken = await newSfTokenGen();
        // console.log(newBearerToken);
        const apiHeader = { headers: {
            "Content-Type": "application/json",
            "Authorization": String(newBearerToken),
            "Cookie": "BrowserId=wlkDXIwDEfGoEsVU8ci1RQ; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1"
        }};

        let updatedEnquiryPayload;
        if (newEnquiryPayload?.length > 0 && String(enquiryPayload?.purposeGroup) !== "joborothers") {
            const enqResponse = await axios.post(ENQUIRY_API_URL, newEnquiryPayload, apiHeader);
            // console.log(`Enquiry Response::=>> `, enqResponse);

            updatedEnquiryPayload = newEnquiryPayload?.map(enq => ({
                ...enq,
                leadId: String(enqResponse?.data?.results?.find(result => String(result.webEnquiryNo).trim() === String(enq.wbEnquiryNo).trim())?.leadId).trim()
            }));
        }
        else {
            updatedEnquiryPayload = newEnquiryPayload?.map(enq => ({
                ...enq,
            }));
        }

        // console.log(`Updated Enquiry Payload::=>> `, updatedEnquiryPayload);
        const enquiryResponse = await createMultipleFunction(updatedEnquiryPayload);
        if (enquiryResponse?.length > 0) {
            res.status(201).json({
                success: true,
                message: "All Enquiry details created successfully",
                data: enquiryResponse,
            });
        }
        else {
            res.status(401).json({
                success: true,
                message: "All Enquiry details creation failed",
                data: enquiryResponse,
            });
        }


        // Enquiry email notification using Graph API
        // const template = mailTemplate(enquiryResponse);

        // const mailResponse = await mailConfig({
        //     to: [to_eml],
        //     cc: [],
        //     bcc: [],
        //     subject: "New Enquiry Notification",
        //     html: template,
        //     attachments: [],
        // });

        // if (enquiryResponse?.length > 0 && mailResponse?.status === 202) {
        //     console.log("Email sent successfully:", mailResponse);
        //     res.status(201).json({
        //     success: true,
        //     message: "All Enquiry details created & email notification sent successfully",
        //     data: enquiryResponse,
        //     });
        // }
        // else {
        //     console.error("Failed to send email:", mailResponse);
        //     res.status(201).json({
        //     success: true,
        //     message: "All Enquiry details created, but Failed to send email notification",
        //     data: enquiryResponse,
        //     });
        // }
    }
    catch (error) {
        console.error("Error creating enquiry:", error.response ? error.response.data : error.message);
        res.status(400).json({
            success: false,
            message: "Failed to create enquiry",
            error: error.response ? error.response.data : error.message,
        });
    }
};

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