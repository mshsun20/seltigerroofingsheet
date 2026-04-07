import express from 'express';
const blogRouter = express.Router();
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogs.js';

// Routes ---------------------------------------------------------------------------------------------------------------------------------------------------------
blogRouter.post('/', createBlog);
blogRouter.get('/', getBlogs);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);

export default blogRouter;