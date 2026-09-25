import React from 'react'
import "../../styles/blogs.css";
import { Link } from 'react-router';
import AddEdit from './AddEdit';
import axiosInstance from '../../config/axiosInstance';

const Blogs = () => {
    const [data, setData] = React.useState([]);
    const [mode, setMode] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);
    const [blog, setBlog] = React.useState({});

    const fetchData = React.useCallback(async () => {
        try {
            const response = await axiosInstance.get('/blogs');
            // console.log(response);
            setTimeout(() => {
                setData(response.data.data || []);
            }, 0)
        }
        catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    }, [])
    React.useEffect(() => {
        fetchData();
    }, [fetchData])

    const handleSubmit = async (blogData) => {
        // console.log(blogData);
        try {
            let response;
            if (mode === "add") {
                response = await axiosInstance.post('/blogs', blogData.formData);
            }
            else if (mode === "edit") {
                response = await axiosInstance.patch(`/blogs/${blogData.id}`, blogData.formData);
            }

            if (response.status === 201) {
                alert(`Blog post for ${response.data.data.slug} ${mode === "add" ? "created" : "updated"} successfully!`);
                setShowForm(false);
                setMode(null);
                fetchData();
            }
            else {
                alert(response.data.message)
            }
        }
        catch (error) {
            console.error("Error submitting blog post:", error);
            alert("ERROR details: " + (error.response?.data?.error || error.message || "An unknown error occurred"));
        }
    }

    const handleRemove = async (e, id) => {
        e.preventDefault();

        try {
            if (confirm(`Confirm Blog removal ?`)) {
                const response = await axiosInstance.delete(`/blogs/${id}`)
                if (response.status === 200) {
                    alert(response.data.message)
                    fetchData()
                }
                else {
                    alert(response.data.message)
                }
            }
        } catch (error) {
            console.error(error)
            alert("ERROR details: " + (error.response?.data?.error || error.message || "An unknown error occurred"));
        }
    }


  return (
    <>
        <div className="main-content">
            <div className="main-heading">
                <h1>Blogs</h1>
            </div>
            <div className="main-data-section">
                <div className="main-data-description">
                    <p>Here you can manage your blog posts. You can create, edit, and delete blog posts as needed.</p>
                    <p>To create a new blog post, click the "Create New Blog Post" button below. To edit or delete an existing blog post, click on the respective buttons next to each post in the list.</p>
                </div>
                <div className="main-lnk-group">
                    <button className="create-btn" onClick={() => {
                        setMode("add");
                        setShowForm(true);
                    }}>
                        Create New Blog Post
                    </button>
                    <Link to='/image-uploader'>Image Uploader</Link>
                </div>
                <div className="main-data-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Author</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((blog) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.slug}</td>
                                    <td>{blog.author?.name}</td>
                                    <td>
                                        <img src={blog?.mediaLink} alt="Blog Image" width={100} height={75} />
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            setMode("edit");
                                            setBlog(blog);
                                            setShowForm(true);
                                        }}>
                                            Edit
                                        </button>
                                        <button className="delete-btn" onClick={(e) => handleRemove(e, blog?._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {
                showForm === true && <AddEdit
                    mode={mode === "edit" ? "edit" : "add"}
                    initialData={mode === "edit" ? blog : {}}
                    onSubmit={handleSubmit}
                    onSuccess={fetchData}
                    onCancel={() => setShowForm(false)}
                />
            }
        </div>
    </>
  )
}

export default Blogs