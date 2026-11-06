import express from 'express';
const blogRouter = express.Router();
import fileUpload from '../../middlewares/fileUpload.js';
import Blog from '../../handlers/admin/blogs.js';

// Routes ---------------------------------------------------------------------------------------------------------------------------------------------------------
blogRouter.post('/', fileUpload.none(), Blog.createBlog);
blogRouter.get('/', Blog.getBlogs);
blogRouter.get('/:slug', Blog.getBlogBySlug);
blogRouter.get('/:id', Blog.getBlogById);
blogRouter.patch('/:id', fileUpload.none(), Blog.updateBlog);
blogRouter.delete('/:id', Blog.deleteBlog);

export default blogRouter;