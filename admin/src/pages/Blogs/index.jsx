import React from 'react'
import axios from 'axios'

const Blogs = ({ blogDetails }) => {
    const [data, setData] = React.useState([]);

    const fetchData = React.useCallback(async () => {
        try {
            const response = await axios.get('/api/blogs');
            setData(response.data || []);
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
                <button className="create-btn">Create New Blog Post</button>
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
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blogs