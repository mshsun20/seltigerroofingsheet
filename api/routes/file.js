import express from "express";
import fileUpload from '../middlewares/fileUpload.js';
import {
    uploadHandler,
    getAllHandler,
    getByIdHandler,
    downloadAllHandler,
    deleteHandler,
    deleteManyHandler
} from "../controllers/fileOpController.js";
const fileRouter = express.Router();

fileRouter.post('/upload', fileUpload.fields([{ name: 'files' }]), uploadHandler);
fileRouter.get('/fetch-all', getAllHandler);
fileRouter.get('/fetch/:id', getByIdHandler);
fileRouter.get('/download-zip', downloadAllHandler);
fileRouter.delete('/:fileId', deleteHandler);
fileRouter.post('/delete-many', deleteManyHandler);

export default fileRouter;