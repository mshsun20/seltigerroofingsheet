import React from 'react'

const AddEdit = ({
    onCancel,
    onSubmit,
    // mode = "add",
    initialData = {},
}) => {
    const [form, setForm] = React.useState({
        title: '',
        slug: '',
        metaTitle: '',
        metaDescription: '',
        author: '',
        content: '',
        mediaLink: ''
    });

    React.useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || '',
                slug: initialData.slug || '',
                metaTitle: initialData.metaTitle || '',
                metaDescription: initialData.metaDescription || '',
                author: initialData.author || '',
                content: initialData.content || '',
                mediaLink: initialData.mediaLink || ''
            });
        }
    }, [initialData]);

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

        onSubmit(formData);
        // Handle form submission logic here
    };

    const handleCancel = () => {
        onCancel(false);
        // Handle cancel logic here
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
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={form.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input type="text" id="slug" value={form.slug} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="metaTitle">Meta Title</label>
                        <input type="text" id="metaTitle" value={form.metaTitle} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="metaDescription">Meta Description</label>
                        <input type="text" id="metaDescription" value={form.metaDescription} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" value={form.author} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" rows="5" value={form.content} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mediaLink">Media Link</label>
                        <input type="text" id="mediaLink" value={form.mediaLink} onChange={handleChange} />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Create Blog Post</button>
                    <button type="submit" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddEdit