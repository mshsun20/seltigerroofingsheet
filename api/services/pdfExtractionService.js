import fs from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { PDFParse } from "pdf-parse";
import { createWorker } from "tesseract.js";

import { getFile } from "./documentService.js";


const execFileAsync = promisify(execFile);


// ==========================================================
// PDF TEXT EXTRACTION
// ==========================================================

const extractPdfText = async (filePath) => {

    const buffer = await fs.readFile(filePath);

    let parser;

    try {

        parser = new PDFParse({
            data: buffer
        });

        const result = await parser.getText();

        return (result.text || "").trim();

    } finally {

        if (parser) {
            await parser.destroy();
        }

    }
};


// ==========================================================
// PDF → IMAGES
// ==========================================================

const convertPdfToImages = async (filePath) => {

    const tempDirectory = path.join(
        path.dirname(filePath),
        ".ocr-temp"
    );

    await fs.mkdir(
        tempDirectory,
        {
            recursive: true
        }
    );


    const outputPrefix = path.join(
        tempDirectory,
        `${path.basename(
            filePath,
            path.extname(filePath)
        )}-${Date.now()}`
    );


    await execFileAsync(
        "pdftoppm",
        [
            "-jpeg",
            "-r",
            "200",
            filePath,
            outputPrefix
        ]
    );


    const files = await fs.readdir(
        tempDirectory
    );


    return files
        .filter(
            file =>
                file.startsWith(
                    path.basename(outputPrefix)
                ) &&
                file.endsWith(".jpg")
        )
        .sort()
        .map(
            file =>
                path.join(
                    tempDirectory,
                    file
                )
        );
};


// ==========================================================
// OCR
// ==========================================================

const extractOcrText = async (imagePaths) => {

    const worker = await createWorker("eng");

    let text = "";


    try {

        for (const imagePath of imagePaths) {

            const result =
                await worker.recognize(
                    imagePath
                );

            text += `\n${result.data.text}`;
        }

    } finally {

        await worker.terminate();

    }


    return text.trim();
};


// ==========================================================
// REMOVE OCR TEMP FILES
// ==========================================================

const removeTempImages = async (imagePaths) => {

    await Promise.all(

        imagePaths.map(
            async imagePath => {

                try {

                    await fs.unlink(
                        imagePath
                    );

                } catch {

                    // Ignore cleanup errors

                }

            }
        )

    );
};


// ==========================================================
// MAIN EXTRACTION
// ==========================================================

export const extractDocumentText = async (
    relativePath
) => {

    const { filePath } =
        await getFile(relativePath);


    // ======================================================
    // Validate extension
    // ======================================================

    if (
        path.extname(filePath).toLowerCase() !==
        ".pdf"
    ) {

        return {
            text: "",
            method: "none"
        };

    }


    // ======================================================
    // STEP 1
    // Try pdf-parse
    // ======================================================

    try {

        const pdfText =
            await extractPdfText(
                filePath
            );


        /*
         * A text-based PDF normally contains
         * sufficient extractable characters.
         */

        if (
            pdfText &&
            pdfText
                .replace(/\s/g, "")
                .length >= 20
        ) {

            return {

                text: pdfText,

                method: "pdf-parse"

            };

        }


        console.log(
            `PDF text insufficient, switching to OCR: ${relativePath}`
        );

    } catch (error) {

        console.warn(
            `pdf-parse failed for ${relativePath}:`,
            error.message
        );

        console.log(
            `Switching to OCR: ${relativePath}`
        );

    }


    // ======================================================
    // STEP 2
    // OCR fallback
    // ======================================================

    let imagePaths = [];


    try {

        imagePaths =
            await convertPdfToImages(
                filePath
            );


        const ocrText =
            await extractOcrText(
                imagePaths
            );


        if (ocrText) {

            return {

                text: ocrText,

                method: "tesseract"

            };

        }


        return {

            text: "",

            method: "tesseract"

        };

    } finally {

        await removeTempImages(
            imagePaths
        );

    }

};