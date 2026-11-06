import {
    createFunction,
    readFunction,
    readByIdFunction,
    readByUniqueFunction,
    updateFunction,
    deleteFunction
} from "../../controllers/admin/blogs.js";

// Reusable functions --------------------------------------------------------------------------------------------------------------------------------------------------------
export const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
};

export const parseToJson = (dataSet={}) => {
    Object.assign(dataSet, {
        author: JSON.parse(dataSet.author),
        blocks: JSON.parse(dataSet.blocks),
        faqs: JSON.parse(dataSet.faqs),
        tags: JSON.parse(dataSet.tags),
    })
    dataSet.author.socials = dataSet.author.socials?.filter(elm => elm.link!=="")
    dataSet.blocks = dataSet.blocks?.filter(elm => elm.blockSnippet!=="")
    dataSet.faqs = dataSet.faqs?.filter(elm => elm.heading!=="" || elm.details!=="")
    dataSet.tags = dataSet.tags?.filter(elm => elm.info!=="")

    return dataSet
}

// Controller logics ---------------------------------------------------------------------------------------------------------------------------------------------------------
const createBlog = async (req, res) => {
    try {
        const blogPayload = req.body;
        const existingBlog = await Blog.findOne({ slug: blogPayload?.slug });
        if (existingBlog) {
            return res.status(400).json({ error: `A blog post for '${slug}' already exists`, success: false });
        }
        
        const parsedPayload = parseToJson(blogPayload);
        // console.log(parsedPayload);
        const blogData = await createFunction(parsedPayload);
        res.status(201).json({ message: "Blog post created successfully", data: blogData, success: true });
    } catch (error) {
        res.status(400).json({ error: "Failed to create blog post", success: false });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await readFunction();
        res.status(200).json({ message: "Blog posts fetched successfully", data: blogs, success: true });
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch blog posts", success: false });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await readByIdFunction(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(200).json({ message: "Blog post fetched successfully", data: blog, success: true });
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch blog post", success: false });
    }
};

const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await readByUniqueFunction(slug);
        if (!blog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(200).json({ message: "Blog post fetched successfully", data: blog, success: true });
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch blog post", success: false });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogPayload = req.body;
        // console.log(blogPayload);

        delete blogPayload._id;
        delete blogPayload.slug;
        const parsedPayload = parseToJson(blogPayload);
        // console.log(parsedPayload);
        const updatedBlog = await updateFunction(parsedPayload, id);
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(201).json({ message: "Blog post updated successfully", data: updatedBlog, success: true });
    } catch (error) {
        res.status(400).json({ error: "Failed to update blog post", success: false });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await deleteFunction(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(200).json({ message: "Blog post deleted successfully", success: true });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete blog post", success: false });
    }
};

const Blog = {
    createBlog,
    getBlogs,
    getBlogById,
    getBlogBySlug,
    updateBlog,
    deleteBlog
};

export default Blog;