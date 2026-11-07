
import {
    uploadFile,
    getAllFiles,
    getFileStream,
    getZipStream,
    deleteFile
} from "../config/fileStorage.js";

/* ------------------------------------------------------------------
   ✅ Upload single file
------------------------------------------------------------------ */
export const uploadSingleFile = async (file) => {
    if (!file) {
        throw new Error("No file provided for upload.");
    }

    try {
        const res = await uploadFile(
            file.buffer,
            file.originalname,
            file.mimetype
        );

        if (!res?.file) {
            throw new Error("File upload failed.");
        }

        return {
            uploaded: res.file,
            duplicate: Boolean(res.duplicate),
            message: res.duplicate
                ? "File already exists. Existing file reused."
                : "File uploaded successfully."
        };

    } catch (err) {
        console.error("Single file upload error:", err);

        throw new Error(
            err.message || "Unable to upload file."
        );
    }
};


/* ------------------------------------------------------------------
   ✅ Upload multiple files
------------------------------------------------------------------ */
export const uploadFiles = async (files = []) => {
    const uploaded = [];
    const duplicates = [];
    const failed = [];

    await Promise.allSettled(
        files.map(async (file) => {
            try {
                const res = await uploadFile(
                    file.buffer,
                    file.originalname,
                    file.mimetype
                );

                if (res?.duplicate && res?.file) {
                    duplicates.push(file.originalname);
                    uploaded.push(res.file);
                } else if (res?.file) {
                    uploaded.push(res.file);
                } else {
                    failed.push({
                        fileName: file.originalname,
                        message: "File upload failed."
                    });
                }

            } catch (err) {
                console.error("Upload error:", err);

                failed.push({
                    fileName: file.originalname,
                    message: err.message || "Upload failed."
                });
            }
        })
    );

    return {
        uploaded,
        duplicates,
        failed
    };
};


/* ------------------------------------------------------------------
   ✅ Get all files
------------------------------------------------------------------ */
export const getFiles = async () => {
    return await getAllFiles();
};


/* ------------------------------------------------------------------
   ✅ Download single file
------------------------------------------------------------------ */
export const getFileById = async (fileId) => {
    return await getFileStream(fileId);
};


/* ------------------------------------------------------------------
   ✅ Download multiple files ZIP
------------------------------------------------------------------ */
export const downloadFilesZip = async (ids = []) => {
    return await getZipStream(ids);
};


/* ------------------------------------------------------------------
   ✅ Delete single file
------------------------------------------------------------------ */
export const removeFile = async (fileId) => {
    return await deleteFile(fileId);
};


/* ------------------------------------------------------------------
   ✅ Delete multiple files
------------------------------------------------------------------ */
export const deleteFiles = async (ids = []) => {
    const results = [];

    await Promise.allSettled(
        ids.map(async (id) => {
            try {
                const res = await deleteFile(id);

                results.push({
                    success: true,
                    ...res
                });

            } catch (err) {
                results.push({
                    success: false,
                    _id: id,
                    message: err.message
                });
            }
        })
    );

    return results;
};
