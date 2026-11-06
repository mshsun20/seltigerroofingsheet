import {
    createMultipleFunction,
    readFunction,
    deleteFunction
} from "../controllers/enquiry.js";
import { idValidator } from "../utilities/idValidator.js";
import crypto from "crypto";
import {
    newSfTokenGen
} from "../config/sfTokenGen.js";


const ENQUIRY_API_URL = String(process.env.SF_LEAD_ADD).trim();

// Reusables Functions

// Controller logics
// const create = async (req, res) => {
//     try {
//         const enquiryPayload = req.body
//         // console.log(enquiryPayload);
//         Object.assign(enquiryPayload, { enquiryNo: crypto.randomUUID() });
//         const existingEnquiry = await readByUniqueFunction(enquiryPayload?.enquiryNo);
//         if (!existingEnquiry) {
//             const newEnquiry = await createFunction(enquiryPayload);
//             if (!newEnquiry) return res.status(401).json({ message: 'Enquiry details creation failed.', success: false })
//             return res.status(201).json({ message: 'Enquiry details created successfully.', success: true, data: newEnquiry })
//         }
//         else {
//             ['_id', '__v', 'createdAt', 'updatedAt'].forEach(elm => delete enquiryPayload[elm])
//             const updatedEnquiry = await updateFunction(enquiryPayload, existingEnquiry?._id);
//             if (!updatedEnquiry) return res.status(401).json({ message: 'Existing Enquiry details update failed.', success: false })
//             return res.status(201).json({ message: 'Existing Enquiry details updated successfully.', success: true, data: updatedEnquiry })
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error.', success: false, data: error });
//     }
// }


const create = async (req, res) => {
    try {
        const enquiryPayload = req.body;
        // console.log(enquiryPayload);
        const attachment = req.file;

        if (attachment) {
            const s3Url = await uploadtoS3(attachment, "enquiry");
            // console.log(s3Url);
            if (!s3Url) {
                res.status(400).json({
                    success: false,
                    message: "Document upload error",
                });
            }
            enquiryPayload.attachment = s3Url;
        }

        // const date = new Date();

        Object.assign(enquiryPayload, {
            source: SRC_REGISTER?.find(src => src.code === "sm")?.value,
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
        })
        // console.log(enquiryPayload);
        const newEnquiryPayload = []

        if (enquiryPayload?.businessRequirements?.length > 0) {
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
        else if (enquiryPayload?.productInterests?.length > 0) {
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

        if (newEnquiryPayload?.length > 0) {
            const enqResponse = await axios.post(ENQUIRY_API_URL, newEnquiryPayload, apiHeader)
            const updatedEnquiryPayload = newEnquiryPayload?.map((enq, i) => ({
                ...enq,
                leadId: String(enqResponse?.data?.results?.find(result => String(result.webEnquiryNo).trim() === String(enq.wbEnquiryNo).trim())?.leadId).trim()
            }));
            const enquiryResponse = await createMultipleFunction(updatedEnquiryPayload);

            if (enquiryResponse?.length > 0) {
                res.status(201).json({
                    success: true,
                    message: "All Enquiry details created successfully",
                    data: enquiryResponse,
                });
            }
            else {
                res.status(201).json({
                    success: true,
                    message: "All Enquiry details creation failed",
                    data: enquiryResponse,
                });
            }



            // Enquiry email notification using Graph API
            const template = mailTemplate(enquiryResponse);

            const mailResponse = await mailConfig({
                to: [to_eml],
                cc: [],
                bcc: [],
                subject: "New Enquiry Notification",
                html: template,
                attachments: [],
            });

            if (enquiryResponse?.length > 0 && mailResponse?.status === 202) {
                console.log("Email sent successfully:", mailResponse);
                res.status(201).json({
                success: true,
                message: "All Enquiry details created & email notification sent successfully",
                data: enquiryResponse,
                });
            }
            else {
                console.error("Failed to send email:", mailResponse);
                res.status(201).json({
                success: true,
                message: "All Enquiry details created, but Failed to send email notification",
                data: enquiryResponse,
                });
            }
        }
        else {
            res.status(500).json({
                success: false,
                message: "No enquiry data submitted",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create enquiry",
            error: error,
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