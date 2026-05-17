import React from 'react'
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
            const response = await axiosInstance.get('/api/blogs');
            // console.log(response);
            setData(response.data.data || []);
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
                response = await axiosInstance.post('/api/blogs', blogData.formData);
            }
            else if (mode === "edit") {
                response = await axiosInstance.patch(`/api/blogs/${blogData.id}`, blogData.formData);
            }
            alert(`Blog post for ${response.data.data.slug} ${mode === "add" ? "created" : "updated"} successfully!`);
            setShowForm(false);
            setMode(null);
            fetchData();
        }
        catch (error) {
            console.error("Error submitting blog post:", error);
            alert("ERROR details: " + (error.response?.data?.error || error.message || "An unknown error occurred"));
        }
    }


  return (
    <>
        <div className="content">
            <div className="heading">
                <h1>Blogs</h1>
            </div>
            <div className="data-section">
                <div className="data-description">
                    <p>Here you can manage your blog posts. You can create, edit, and delete blog posts as needed.</p>
                    <p>To create a new blog post, click the "Create New Blog Post" button below. To edit or delete an existing blog post, click on the respective buttons next to each post in the list.</p>
                </div>
                <div className="lnk-group">
                    <button className="create-btn" onClick={() => {
                        setMode("add");
                        setShowForm(true);
                    }}>
                        Create New Blog Post
                    </button>
                    <Link to='/image-uploader'>Image Uploader</Link>
                </div>
                <div className="data-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Author</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((blog) => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.slug}</td>
                                    <td>{blog.author}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            setMode("edit");
                                            setBlog(blog);
                                            setShowForm(true);
                                        }}>
                                            Edit
                                        </button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
        </div>
    </>
  )
}

export default Blogs