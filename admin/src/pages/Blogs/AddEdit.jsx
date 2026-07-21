import React from 'react'
import axiosInstance from '../../config/axiosInstance';

const socialDetails = [{
    provider: "",
    link: "",
}]
const blockSection = [{
    blockType: "",
    blockSnippet: "",
    blockTags: "",
    blockContent: "",
}]
const faqsSection = [{
    heading: "",
    details: "",
}]
const tagSection = [{
    info: "",
    link: "",
}]

const initialForm = {
    slug: '',
    title: '',
    description: '',
    url: '',
    type: '',
    site_name: '',
    robots: '',
    canonical: '',
    author: {
        name: '',
        bio: '',
        socials: [...socialDetails]
    },
    mediaLink: '',
    blocks: [...blockSection],
    faqs: [...faqsSection],
    tags: [...tagSection]
}

const AddEdit = ({
    onCancel,
    onSubmit,
    mode = "add",
    initialData = {}
}) => {
    const [form, setForm] = React.useState({
        slug: initialData.slug || '',
        title: initialData.title || '',
        description: initialData.description || '',
        url: initialData.url || '',
        type: initialData.type || '',
        site_name: initialData.site_name || '',
        robots: initialData.robots || '',
        canonical: initialData.canonical || '',
        author: {
            name: initialData.author?.name || '',
            bio: initialData.author?.bio || '',
            socials: initialData.author?.socials?.map(elm => elm) || [...socialDetails]
        },
        mediaLink: initialData.mediaLink || '',
        blocks: initialData.blocks?.map(elm => elm) || [...blockSection],
        faqs: initialData.faqs?.map(elm => elm) || [...faqsSection],
        tags: initialData.tags?.map(elm => elm) || [...tagSection]
    });
    const [fileList, setFileList] = React.useState([])

    const fetchData = React.useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/api/files/fetch-all`)
            setTimeout(() => {
                setFileList(response.data.files || [])
            }, 0)
        } catch (error) {
            console.error(error)
        }
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    // All Add sections
    const addSocials = () => {
        setForm(prev => ({
            ...prev,
            author: {
                ...prev.author,
                socials: [
                    ...prev.author.socials,
                    {
                        provider: "",
                        link: "",
                    }
                ]
            }
        }));
    };
    const addBlocks = () => {
        setForm(prev => ({
            ...prev,
            blocks: [
                ...prev.blocks,
                {
                    blockType: "",
                    blockSnippet: "",
                    blockTags: "",
                    blockContent: "",
                }
            ]
        }))
    }
    // console.log(blocks);
    const addFaqs = () => {
        setForm(prev => ({
            ...prev,
            faqs: [
                ...prev.faqs,
                {
                    heading: "",
                    details: "",
                }
            ]
        }))
    }
    const addTags = () => {
        setForm(prev => ({
            ...prev,
            tags: [
                ...prev.tags,
                {
                    info: "",
                    link: "",
                }
            ]
        }))
    }

    // on page load
    React.useEffect(() => {
        if (mode === "edit" && initialData) {
            setTimeout(() => {
                setForm({...initialData});
            }, 0)
        }
        else {
            setTimeout(() => {
                setForm({...initialForm});
            }, 0)
        }
    }, [mode, initialData]);

    // All change sections
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAuthorChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            author: {
                ...prev.author,
                [name]: value,
            }
        }));
    };
    const handleAuthorSocialChange = (index, e) => {
        const { name, value } = e.target;

        const updateSocials = [...form.author.socials];
        updateSocials[index] = {
            ...updateSocials[index],
            [name]: value
        }

        setForm(prev => ({
            ...prev,
            author: {
                ...prev.author,
                socials: updateSocials
            }
        }))
    }
    
    const handleBlockChange = (index, e) => {
        const { name, value } = e.target;

        const updatedBlocks = [...form.blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            [name]: value
        };

        setForm(prev => ({
            ...prev,
            blocks: updatedBlocks
        }));
    };
    
    const handleFaqChange = (index, e) => {
        const { name, value } = e.target;

        const updatedFaqs = [...form.faqs];
        updatedFaqs[index] = {
            ...updatedFaqs[index],
            [name]: value
        };

        setForm(prev => ({
            ...prev,
            faqs: updatedFaqs
        }));
    };
    
    const handleTagChange = (index, e) => {
        const { name, value } = e.target;

        const updatedTags = [...form.tags];
        updatedTags[index] = {
            ...updatedTags[index],
            [name]: value
        };

        setForm(prev => ({
            ...prev,
            tags: updatedTags
        }));
    };


    // submit functions
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);

        const formData = new FormData();
        for (const key in form) {
            if (key === "author") {
                formData.append("author", JSON.stringify(form.author));
            }
            else if (key === "blocks") {
                formData.append("blocks", JSON.stringify(form.blocks));
            }
            else if (key === "faqs") {
                formData.append("faqs", JSON.stringify(form.faqs));
            }
            else if (key === "tags") {
                formData.append("tags", JSON.stringify(form.tags));
            }
            else {
                formData.append(key, form[key]);
            }
        }

        setForm(initialForm)
        onSubmit({ formData, id: initialData?._id });
    };

    const handleCancel = () => {
        setForm(initialForm)
        onCancel(false);
    };

  return (
    <>
        <div className="content">
            <div className="heading">
                <h1>Create / Edit Blog Post</h1>
            </div>
            <div className="data-section">
                <div className="data-description">
                    <p>Use the form below to create a new blog post or edit an existing one. Fill in the required fields and click "Submit" to save your changes.</p>
                </div>
                <div className='add-edit-form'>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input type="text" name="slug" className="form-control" placeholder="Add Slug" value={form.slug} onChange={handleChange} disabled={mode!=="add"} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" className="form-control" placeholder="Add Title" value={form.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" className="form-control" placeholder="Add Description" cols={24} rows={5} value={form.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input type="text" name="url" className="form-control" placeholder="Add URL" value={form.url} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input type="text" name="type" className="form-control" placeholder="Add Type" value={form.type} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="site_name">Site Name</label>
                        <input type="text" name="site_name" className="form-control" placeholder="Add Site Name" value={form.site_name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="robots">Robots</label>
                        <input type="text" name="robots" className="form-control" placeholder="Add Robots" value={form.robots} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="canonical">Cannonical</label>
                        <input type="text" name="canonical" className="form-control" placeholder="Add Cannonical" value={form.canonical} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mediaLink">Media Link</label>
                        <select name="mediaLink" id="mediaLink" className="form-control" value={form.mediaLink} onChange={handleChange}>
                            <option value="">Choose</option>
                            {fileList?.map((itm, i) => (
                                <option value={itm?.relativePath} key={i}>
                                    {itm.relativePath.split("/").pop()}
                                </option>
                            ))}
                        </select>
                        {form?.mediaLink!=="" ? (
                            <div className="form-media-preview">
                                <img
                                    src={form.mediaLink}
                                    alt="Selected media"
                                />
                            </div>
                        ) : <span></span>}
                    </div>

                    <div
                        className="author-section"
                        style={{ padding:"1rem", border:"0.2rem solid black" }}
                    >
                        <label htmlFor="name">Author</label>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Add Author Name" value={form.author.name} onChange={handleAuthorChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea type="text" name="bio" className="form-control" placeholder="Add Author Bio" value={form.author.bio} onChange={handleAuthorChange}></textarea>
                        </div>

                        <div className="socials-group">
                            <label htmlFor="name">Social</label>
                            <div className="socials-activator">
                                <button onClick={addSocials}>Add New Social</button>
                            </div>
                            {form?.author?.socials?.length>0
                            && form?.author?.socials?.map((elm, i) => (
                                <div id="socials-section" key={i}>
                                    <div className="form-group">
                                        <label htmlFor="provider">Provider</label>
                                        <input type="text" name="provider" className="form-control" placeholder="Add Provider" value={form.author.socials[i]?.provider || ""} onChange={(e) => handleAuthorSocialChange(i, e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="link">Link</label>
                                        <input type="text" name="link" className="form-control" placeholder="Add Link" value={form.author.socials[i]?.link || ""} onChange={(e) => handleAuthorSocialChange(i, e)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="blocks-group"
                        style={{ padding:"1rem", border:"0.2rem solid black" }}
                    >
                        <label htmlFor="name">Block</label>
                        <div className="blocks-activator">
                            <button onClick={addBlocks}>Add New Block</button>
                        </div>
                        {
                            form?.blocks?.length>0
                            && form?.blocks?.map((elm, i) => (
                                <div id="blocks-section" key={i}>
                                    <div className="form-group">
                                        <label htmlFor="blockType">Type</label>
                                        <select name="blockType" className="form-select" value={form.blocks[i]?.blockType || ""} onChange={(e) => handleBlockChange(i, e)}>
                                            <option value="">Choose-------</option>
                                            <option value="snippet">Using Snippets</option>
                                            <option value="tag">Using Tags</option>
                                        </select>
                                    </div>
                                    {
                                        form.blocks[i]?.blockType==="snippet" && (
                                            <div className="form-group">
                                                <label htmlFor="blockSnippet">Code Snippet</label>
                                                <textarea name="blockSnippet" cols={24} rows={5} className='form-control' placeholder='Code snippets' value={form.blocks[i]?.blockSnippet || ""} onChange={(e) => handleBlockChange(i, e)}></textarea>
                                            </div>
                                        )
                                    }
                                    {
                                        form.blocks[i]?.blockType==="tag" && (
                                            <div className="form-group">
                                                <label htmlFor="blockTags">Tag Name</label>
                                                <input type="text" name="blockTags" className="form-control" placeholder="Add Tag Name" value={form.blocks[i]?.blockTags || ""} onChange={(e) => handleBlockChange(i, e)} />
                                            </div>
                                        )
                                    }
                                    {
                                        form.blocks[i]?.blockType==="tag" && (
                                            <div className="form-group">
                                                <label htmlFor="blockContent">Tag Content</label>
                                                <textarea name="blockContent" cols={24} rows={5} className='form-control' placeholder='Block Content' value={form.blocks[i]?.blockContent || ""} onChange={(e) => handleBlockChange(i, e)}></textarea>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div
                        className="faqs-group"
                        style={{ padding:"1rem", border:"0.2rem solid black" }}
                    >
                        <label htmlFor="name">Faqs</label>
                        <div className="faqs-activator">
                            <button onClick={addFaqs}>Add New Faqs</button>
                        </div>
                        {
                            form?.faqs?.length>0
                            && form?.faqs?.map((elm, i) => (
                                <div id="faqs-section" key={i}>
                                    <div className="form-group">
                                        <label htmlFor="heading">Heading</label>
                                        <input type="text" name="heading" className="form-control" placeholder="Add Faqs heading" value={form.faqs[i]?.heading || ""} onChange={(e) => handleFaqChange(i, e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="details">Details</label>
                                        <textarea name="details" cols={24} rows={5} className='form-control' placeholder='Code snippets' value={form.faqs[i]?.details || ""} onChange={(e) => handleFaqChange(i, e)}></textarea>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div
                        className="tags-group"
                        style={{ padding:"1rem", border:"0.2rem solid black" }}
                    >
                        <label htmlFor="name">Tags</label>
                        <div className="tags-activator">
                            <button onClick={addTags}>Add New Tags</button>
                        </div>
                        {
                            form?.tags?.length>0
                            && form?.tags?.map((elm, i) => (
                                <div id="tags-section" key={i}>
                                    <div className="form-group">
                                        <label htmlFor="info">Info</label>
                                        <input type="text" name="info" className="form-control" placeholder="Add Tag Info" value={form.tags[i]?.info || ""} onChange={(e) => handleTagChange(i, e)} />
                                    </div>
                                    <div className="form-group">
                                        <laurlbel htmlFor="info">URL</laurlbel>
                                        <input type="text" name="url" className="form-control" placeholder="Add Tag URL" value={form.tags[i]?.url || ""} onChange={(e) => handleTagChange(i, e)} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="btn-group">
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddEdit