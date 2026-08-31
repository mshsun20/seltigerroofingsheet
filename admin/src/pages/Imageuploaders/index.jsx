import React from 'react'
import { Link } from 'react-router';
import AddEdit from './AddEdit';
import axiosInstance from '../../config/axiosInstance';

const Imageuploaders = () => {
    const [data, setData] = React.useState([]);
    const [mode, setMode] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);
    const [image] = React.useState({})

    const fetchData = React.useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/api/files/fetch-all`)
            setTimeout(() => {
                setData(response.data.files || [])
            }, 0)
        } catch (error) {
            console.error(error)
        }
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleSubmit = async (formData) => {
        console.log(formData);
        try {
            const response = await axiosInstance.post(`/api/files/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            // console.log(response);
            alert(response.data?.message)
            setShowForm(false)
            setMode(null)
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="content">
            <div className="heading">
                <h1>Blogs</h1>
            </div>
            <div className="data-section">
                <div className="lnk-group">
                    <button className="create-btn" onClick={() => {
                        setMode("add");
                        setShowForm(true);
                    }}>
                        Uploader Form
                    </button>
                    <Link to='/blogs'>Blog</Link>
                </div>
                <div className="data-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Size</th>
                                <th>Path</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {
                            data?.length>0
                            && data?.map((img, i) => (
                                <tbody key={i}>
                                    <tr>
                                        <td>
                                            <img src={img?.relativePath} alt="blog image" width={100} height={75} />
                                        </td>
                                        <td>{img?.filename}</td>
                                        <td></td>
                                        <td>{parseFloat(img.size/1000).toFixed(3)}</td>
                                        <td>{img?.relativePath}</td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>

                {
                    showForm === true && <AddEdit
                        mode={mode === "edit" ? "edit" : "add"}
                        initialData={mode === "edit" ? image : {}}
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

export default Imageuploaders