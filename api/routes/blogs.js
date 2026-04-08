import express from 'express';
const blogRouter = express.Router();
import fileUpload from '../middlewares/fileUpload.js';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogs.js';

// Routes ---------------------------------------------------------------------------------------------------------------------------------------------------------
blogRouter.post('/', fileUpload.none(), createBlog);
blogRouter.get('/', getBlogs);
blogRouter.patch('/:id', fileUpload.none(), updateBlog);
blogRouter.delete('/:id', deleteBlog);

export default blogRouter;