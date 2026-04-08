import Blog from "../models/blogs.js";

// Reusable functions --------------------------------------------------------------------------------------------------------------------------------------------------------
export const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
};




// Controller logics ---------------------------------------------------------------------------------------------------------------------------------------------------------
export const createBlog = async (req, res) => {
    try {
        console.log(req.body);
        // const { title, slug, metaTitle, metaDescription, author, content, mediaLink } = req.body;
        // const newBlog = new Blog({ title, slug, metaTitle, metaDescription, author, content, mediaLink });
        // const savedBlog = await newBlog.save();
        // res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: "Failed to create blog post" });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blog posts" });
    }
};

export const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blog post" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, metaTitle, metaDescription, author, content, mediaLink } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, slug, metaTitle, metaDescription, author, content, mediaLink }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: "Failed to update blog post" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete blog post" });
    }
};