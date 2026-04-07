import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    author: { type: String, trim: true },
    content: { type: String, trim: true },
    mediaLink: { type: String, trim: true },
}, { timestamps: true });

const Blog = model("Blog", blogSchema);

export default Blog;