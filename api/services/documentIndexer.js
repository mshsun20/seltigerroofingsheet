import path from "path";
import Document from "../models/document.js";
import {
    scanDirectory,
    getFile,
    isAllowedDocumentFolder,
} from "./documentService.js";
import {
    getExtension,
    getMimeType
} from "../utils/fileUtils.js";
import { extractDocumentText } from "./pdfExtractionService.js";
import {
    extractInvoiceNumber,
    extractInvoiceDate
} from "../utils/invoiceExtractor.js";
import { extractDocumentRefNo } from "../utils/documentReference.js";


/*
 * Build MongoDB data
 * from filesystem information.
 */
const buildDocumentData = (item) => {
    const extension = getExtension(item.name);
    const pathParts = item.path.split("/");
    const folderName = (pathParts.length > 1) ? pathParts[0] : "";

    return {
        name: item.name,
        fileName: item.name,
        folderName,
        relativePath: item.path,
        extension,
        mimeType: getMimeType(extension),
        size: item.size || 0,
        createdAtFilesystem: item.createdAt,
        modifiedAtFilesystem: item.modifiedAt,
        isActive: true
    };
};


/*
 * Index all files inside
 * a specific folder.
 */
export const indexFolder = async (folderName) => {
    if (!isAllowedDocumentFolder(folderName)) return []

    const items = await scanDirectory(folderName);
    const files = items.filter(item => item.type === "file");

    const enrichedDocuments = await Promise.all(
        files.map(async file => {
            const baseDocument = buildDocumentData(file);
            return enrichDocument(baseDocument);
        })
    );

    const operations = enrichedDocuments.map(document => ({
        updateOne: {
            filter: { relativePath: document.relativePath },
            update: { $set: document },
            upsert: true
        }
    }));

    if (operations.length > 0) {
        await Document.bulkWrite(operations);
    }

    return Document.find({ folderName, isActive: true }).sort({ fileName: 1 }).lean();
};


/*
 * Index one file.
 */
// export const indexSingleFile = async (relativePath) => {
//     const { stats } = await getFile(relativePath);
//     const fileName = path.basename(relativePath);
//     const folderName = path.dirname(relativePath).replaceAll("\\", "/");
//     const extension = getExtension(fileName);
//     const data = {
//         name: fileName,
//         fileName,
//         folderName,
//         relativePath,
//         extension,
//         mimeType: getMimeType(extension),
//         size: stats.size,
//         createdAtFilesystem: stats.birthtime,
//         modifiedAtFilesystem: stats.mtime,
//         isActive: true
//     };

//     return Document.findOneAndUpdate({ relativePath }, { $set: data }, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }).lean();
// };
export const indexSingleFile = async (relativePath) => {
    const folderName = path.dirname(relativePath).replaceAll("\\", "/");
    if (!isAllowedDocumentFolder(folderName)) return null;

    const { stats } = await getFile(relativePath);
    const fileName = path.basename(relativePath);
    const extension = getExtension(fileName);

    const data = {
        name: fileName,
        fileName,
        folderName,
        relativePath,
        extension,
        mimeType: getMimeType(extension),
        size: stats.size,
        createdAtFilesystem: stats.birthtime,
        modifiedAtFilesystem: stats.mtime,
        isActive: true
    };

    return Document.findOneAndUpdate({ relativePath }, { $set: data }, {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true
    }).lean();
};


/*
 * Document enrichment.
 */
export const enrichDocument = async (document) => {
    const { relativePath, fileName } = document;
    const documentReference = extractDocumentRefNo(fileName);
    let extractedText = "";
    let extractionMethod = "none";
    let invoiceNumber = null;
    let invoiceDate = null;

    try {
        const extraction = await extractDocumentText(relativePath);
        extractedText = extraction.text || "";
        extractionMethod = extraction.method || "none";
        invoiceNumber = extractInvoiceNumber(extractedText);
        invoiceDate = extractInvoiceDate(extractedText);

        return {
            ...document,
            documentRefNo: documentReference ?.documentRefNo || "",
            documentRefNoNumeric: documentReference ?.documentRefNoNumeric || null,
            invoiceNumber: invoiceNumber || "",
            invoiceDate: invoiceDate || null,
            extractionStatus: "success",
            extractionMethod,
            extractedText,
            extractedAt: new Date(),
            extractionError: ""
        };
    } catch (error) {
        return {
            ...document,
            documentRefNo: documentReference ?.documentRefNo || "",
            documentRefNoNumeric: documentReference ?.documentRefNoNumeric || null,
            extractionStatus: "failed",
            extractionMethod,
            extractionError: error.message,
            extractedAt: new Date()
        };
    }
};

// Reindexing docs
export const reEnrichDocument = async (relativePath) => {
    const existingDocument =
        await Document.findOne({
            relativePath
        }).lean();

    if (!existingDocument) {
        throw new Error(
            `Document not found: ${relativePath}`
        );
    }

    const enrichedDocument =
        await enrichDocument(existingDocument);

    return Document.findOneAndUpdate(
        {
            relativePath
        },
        {
            $set: enrichedDocument
        },
        {
            returnDocument: "after"
        }
    ).lean();
};