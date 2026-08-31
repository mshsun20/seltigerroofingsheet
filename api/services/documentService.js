import fs from "fs/promises";
import path from "path";
import { DOCUMENT_CONFIG } from "../configs/documentConfig.js";

const DOCUMENTS_ROOT = DOCUMENT_CONFIG.filesystemRoot;
const MIN_DOCUMENT_FOLDER_DATE = new Date(2026, 0, 14);

/**
 * Normalize a relative document path.
 */
export const normalizeRelativePath = (relativePath = "") => {
    return String(relativePath).replaceAll("\\", "/").replace(/^\/+/, "").trim();
};


/**
 * Resolve a document path safely.
 *
 * Prevents:
 *
 * ../../etc/passwd
 *
 * from escaping the documents directory.
 */
export const resolveSafePath = (relativePath = "") => {
    const normalizedPath = normalizeRelativePath(relativePath);
    const resolvedPath = path.resolve(DOCUMENTS_ROOT, normalizedPath);
    const rootWithSeparator = `${DOCUMENTS_ROOT}${path.sep}`;
    if (resolvedPath !== DOCUMENTS_ROOT && !resolvedPath.startsWith(rootWithSeparator)) throw new Error("Invalid document path");
    return resolvedPath;
};

export const pathExists = async (relativePath = "") => {
    try {
        const fullPath = resolveSafePath(relativePath);
        await fs.access(fullPath);
        return true;
    } catch {
        return false;
    }
};

/**
 * Check whether a folder name represents a valid
 * document date and is later than 14-01-2026.
 *
 * Example:
 * 13-01-2026 -> false
 * 14-01-2026 -> false
 * 15-01-2026 -> true
 */
export const isAllowedDocumentFolder = (folderName = "") => {
    const match = String(folderName)
        .trim()
        .match(/^(\d{2})-(\d{2})-(\d{4})$/);

    if (!match) {
        return true;
    }

    const [, day, month, year] = match;

    const folderDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    );

    // Reject invalid dates such as 31-02-2026
    if (
        folderDate.getFullYear() !== Number(year) ||
        folderDate.getMonth() !== Number(month) - 1 ||
        folderDate.getDate() !== Number(day)
    ) {
        return false;
    }

    return folderDate >= MIN_DOCUMENT_FOLDER_DATE;
};

/**
 * Get filesystem information.
 */
export const getFilesystemEntry = async (relativePath) => {
    const fullPath = resolveSafePath(relativePath);
    const stats = await fs.stat(fullPath);

    return {
        fullPath,
        stats
    };
};


/**
 * Scan directory.
 */
export const scanDirectory = async (relativePath = "") => {
    const directoryPath = resolveSafePath(relativePath);
    const stats = await fs.stat(directoryPath);
    if (!stats.isDirectory()) throw new Error("Specified path is not a directory");

    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    const documents = await Promise.all(
        entries.map(async (entry) => {
            const entryRelativePath = path.join(relativePath, entry.name).replaceAll("\\", "/");
            const entryFullPath = resolveSafePath(entryRelativePath);
            const entryStats = await fs.stat(entryFullPath);

            return {
                name: entry.name,
                type: entry.isDirectory() ? "folder" : "file",
                path: entryRelativePath,
                size: entry.isDirectory() ? null : entryStats.size,
                createdAt: entryStats.birthtime,
                modifiedAt: entryStats.mtime
            };
        })
    );

    return documents;
};


/**
 * Get single file.
 */
export const getFile = async (relativePath) => {
    const filePath = resolveSafePath(relativePath);
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) throw new Error("Specified path is not a file");

    return {
        filePath,
        stats
    };
};
