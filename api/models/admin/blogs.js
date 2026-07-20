import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const blogSchema = new Schema({
    slug: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    url: { type: String, trim: true },
    type: { type: String, trim: true },
    site_name: { type: String, trim: true },
    robots: { type: String, trim: true },
    canonical: { type: String, trim: true },
    author: {
        name: { type: String, trim: true, required: true },
        bio: { type: String, trim: true },
        socials: [{
            provider: { type: String, trim: true },
            link: { type: String, trim: true },
        }],
    },
    mediaLink: { type: String, trim: true },
    blocks: [{ type: Schema.Types.Mixed, required: true }],
    faqs: [{
        heading: { type: String, trim: true },
        details: { type: String, trim: true },
    }],
    tags: [{ info: { type: String, trim: true } }],
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active' },
    createdBy: { type: Types.ObjectId, ref: 'Account' },
    updatedBy: { type: Types.ObjectId, ref: 'Account' }
}, { timestamps: true });

blogSchema.index({ slug: 1 }); 
blogSchema.index({ status: 1 });

const Blog = model("Blog", blogSchema);

export default Blog;