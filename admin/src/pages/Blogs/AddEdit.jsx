import React from 'react'

const blockSection = [{
    blockType: "",
    blockSnippet: "",
    blockTags: "",
    blockContent: "",
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
    author: '',
    mediaLink: '',
    blocks: [...blockSection]
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
        author: initialData.author || '',
        mediaLink: initialData.mediaLink || '',
        blocks: initialData.blocks?.map(elm => elm) || [...blockSection]
    });
    // const [blocks, setBlocks] = React.useState([...blockSection])

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

    React.useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm({...initialData});
        }
    }, [initialData, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        const formData = new FormData();
        for (const key in form) {
            if (key === "blocks") {
                formData.append("blocks", JSON.stringify(form.blocks));
            } else {
                formData.append(key, form[key]);
            }
        }

        // setForm(initialForm)
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
                        <input type="text" name="description" className="form-control" placeholder="Add Description" value={form.description} onChange={handleChange} />
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
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" className="form-control" placeholder="Add Author" value={form.author} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mediaLink">Media Link</label>
                        <input type="text" name="mediaLink" className="form-control" placeholder="Add Media Link" value={form.mediaLink} onChange={handleChange} />
                    </div>

                    <div className="block-activator">
                        <button onClick={addBlocks}>Add New Block</button>
                    </div>
                    <div className="block-group">
                        {
                            form.blocks?.length>0
                            && form.blocks?.map((elm, i) => (
                                <div id="block-section" key={i}>
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
                                                <input type="text" name="blockTags" className="form-control" placeholder="Add Tag" value={form.blocks[i]?.blockTags || ""} onChange={(e) => handleBlockChange(i, e)} />
                                            </div>
                                        )
                                    }
                                    {
                                        form.blocks[i]?.blockType==="tag" && (
                                            <div className="form-group">
                                                <label htmlFor="blockContent">Block Content</label>
                                                <textarea name="blockContent" cols={24} rows={5} className='form-control' placeholder='Block Content' value={form.blocks[i]?.blockContent || ""} onChange={(e) => handleBlockChange(i, e)}></textarea>
                                            </div>
                                        )
                                    }
                                    
                                    
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