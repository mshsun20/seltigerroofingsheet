import React from 'react'

const AddEdit = ({
    onCancel,
    onSubmit,
    mode = "add",
    initialData = {},
}) => {
    const [form, setForm] = React.useState({
        title: '',
        slug: '',
        metaTitle: '',
        description: '',
        author: '',
        content: '',
        mediaLink: ''
    });

    React.useEffect(() => {
        if (mode === "edit" && initialData) {
            setForm({
                title: initialData.title || '',
                slug: initialData.slug || '',
                metaTitle: initialData.metaTitle || '',
                description: initialData.description || '',
                author: initialData.author || '',
                content: initialData.content || '',
                mediaLink: initialData.mediaLink || ''
            });
        }
    }, [initialData, mode]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        onSubmit({ formData, id: initialData?._id });
    };

    const handleCancel = () => {
        onCancel(false);
    };

  return (
    <>
        <div className="content">
            <div className="heading">
                <h1>Create / Edit Blog Post</h1>
            </div>
            <div className="datasection">
                <p>Use the form below to create a new blog post or edit an existing one. Fill in the required fields and click "Submit" to save your changes.</p>
                <div className='add-edit-form'>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input type="text" id="slug" className="form-control" placeholder="Add Slug" value={form.slug} onChange={handleChange} />
                    </div>

                    <div className="meta-section">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" className="form-control" placeholder="Add Slug" value={form.title} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" className="form-control" placeholder="Add Slug" value={form.description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">URL</label>
                            <input type="text" id="url" className="form-control" placeholder="Add Slug" value={form.url} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input type="text" id="type" className="form-control" placeholder="Add Slug" value={form.type} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="site_name">Site Name</label>
                            <input type="text" id="site_name" className="form-control" placeholder="Add Slug" value={form.site_name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="robots">Robots</label>
                            <input type="text" id="robots" className="form-control" placeholder="Add Slug" value={form.robots} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="canonical">Cannonical</label>
                            <input type="text" id="canonical" className="form-control" placeholder="Add Slug" value={form.canonical} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text" id="author" className="form-control" placeholder="Add Slug" value={form.author} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mediaLink">Media Link</label>
                            <input type="text" id="mediaLink" className="form-control" placeholder="Add Slug" value={form.mediaLink} onChange={handleChange} />
                        </div>
                    </div>

                    <div id="block-section">
                        <div className="form-group">
                            <label htmlFor="blockContent">Block Content</label>
                            <input type="text" id="blockContent" className="form-control" placeholder="Add Slug" value={form.blockContent} onChange={handleChange} />
                            <textarea name="blockContent" id="blockContent" cols={24} rows={5} className='form-control' placeholder='Block HTML Code'></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="className">Uploader</label>
                            <input type="text" id="className" className="form-control" placeholder="Add Slug" value={form.className} onChange={handleChange} />
                        </div>
                        <div className="File-section">
                            <div className="form-group"></div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="blockType">Type</label>
                            {/* <input type="text" id="blockType" value={form.blockType} onChange={handleChange} /> */}
                            <select name="blockType" id="blockType" className="form-select" value={form.blockType} onChange={handleChange}>
                                <option value="0">Choose-------</option>
                                <option value="text">Text</option>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="blockDescription">Description</label>
                            <input type="text" id="blockDescription" value={form.blockDescription} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="blockDetails">Details</label>
                            <input type="text" id="blockDetails" value={form.blockDetails} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddEdit