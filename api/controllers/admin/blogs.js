import Blog from "../../models/admin/blogs.js";

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
export const createBlog = async (req, res) => {
    try {
        const blogPayload = req.body;
        const existingBlog = await Blog.findOne({ slug: blogPayload?.slug });
        if (existingBlog) {
            return res.status(400).json({ error: `A blog post for '${slug}' already exists`, success: false });
        }
        
        const parsedPayload = parseToJson(blogPayload);
        // console.log(parsedPayload);
        const newBlog = new Blog(parsedPayload);
        const savedBlog = await newBlog.save();
        res.status(201).json({ message: "Blog post created successfully", data: savedBlog, success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to create blog post", success: false });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Blog posts fetched successfully", data: blogs, success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blog posts", success: false });
    }
};

export const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(200).json({ message: "Blog post fetched successfully", data: blog, success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blog post", success: false });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogPayload = req.body;
        // console.log(blogPayload);

        delete blogPayload._id;
        delete blogPayload.slug;
        const parsedPayload = parseToJson(blogPayload);
        // console.log(parsedPayload);
        const updatedBlog = await Blog.findByIdAndUpdate(id, parsedPayload, { returnDocument: "after" });
        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(201).json({ message: "Blog post updated successfully", data: updatedBlog, success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to update blog post", success: false });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog post not found", success: false });
        }
        res.status(200).json({ message: "Blog post deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete blog post", success: false });
    }
};