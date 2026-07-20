import React from 'react'
import "../../styles/blogs.css"

const AddEdit = ({
    onCancel,
    onSubmit,
    // mode = "add",
    // initialData = {}
}) => {
    const [files, setFiles] = React.useState([])

    const addFiles = (files) => {
        const newFiles = Array.from(files)
        setFiles(prev => [...prev, ...newFiles])
    }

    const handleFilesChange = (e) => {
        addFiles(e.target.files)
    }
    
    const handleUpload = async (e) => {
        e.preventDefault()
        console.log(files);

        const formData = new FormData()
        files?.forEach((file) => formData.append("files", file))

        onSubmit(formData)
    }

    const handleCancel = () => {
        // setForm(initialForm)
        // setBlocks(blockSection)
        onCancel(false);
    };

  return (
    <>
        <div className="content">
            <div className="heading">
                <h1>Upload / Edit Images</h1>
            </div>
            <div className="data-section">
                <p>Upload Multiple Images</p>
                <div className="add-edit-form">
                    <div className="form-group">
                        <label htmlFor="">Upload Images</label>
                        <input type="file" name="" id="" multiple onChange={handleFilesChange} />
                    </div>
                    <div className="btn-group">
                        <button type="submit" onClick={handleUpload}>Upload</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddEdit