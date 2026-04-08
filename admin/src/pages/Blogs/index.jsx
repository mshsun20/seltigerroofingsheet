import React from 'react'
import AddEdit from './AddEdit';
import axiosInstance from '../../config/axiosInstance';

const Blogs = () => {
    const [data, setData] = React.useState([]);
    const [mode, setMode] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);
    const [blog, setBlog] = React.useState({});

    const handleSubmit = async (blogData) => {
        // console.log(blogData);
        try {
            if (mode === "add") {
                await axiosInstance.post('/api/blogs', blogData.formData);
            }
            else if (mode === "edit") {
                await axiosInstance.patch(`/api/blogs/${blogData.id}`, blogData.formData);
            }
            setShowForm(false);
            setMode(null);
            fetchData();
        }
        catch (error) {
            console.error("Error submitting blog post:", error);
        }
    }

    const fetchData = React.useCallback(async () => {
        try {
            const response = await axiosInstance.get('/api/blogs');
            setData(response.data.data || []);
        }
        catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    }, [])

    React.useEffect(() => {
        fetchData();
    }, [])


  return (
    <>
        <div className="content">
            <div className="heading">
                <h1>Blogs</h1>
            </div>
            <div className="datasection">
                <p>Here you can manage your blog posts. You can create, edit, and delete blog posts as needed.</p>
                <p>To create a new blog post, click the "Create New Blog Post" button below. To edit or delete an existing blog post, click on the respective buttons next to each post in the list.</p>
                <button className="create-btn" onClick={() => {
                    setMode("add");
                    setShowForm(true);
                }}>
                    Create New Blog Post
                </button>
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
                                <tr key={blog.id}>
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