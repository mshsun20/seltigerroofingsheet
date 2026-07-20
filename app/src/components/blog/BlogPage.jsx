"use client";
import React from 'react'
import Card from "@/components/common/Card";
import CustomPagination from "@/components/common/CustomPagination";
const Blogwall = React.lazy(() => import("@/components/blog/Blogwall"));

const BlogPage = ({ blogs, limit }) => {
    const [page, setPage] = React.useState(1);
    const totalPages = Math.ceil(blogs.length / limit);

    const paginatedData = React.useMemo(() => {
        const start = (page - 1) * limit;
        const end = start + limit;

        return blogs.slice(start, end);
    }, [blogs, page, limit]);

    const handlePageChange = React.useCallback((_, value) => {
        setPage(value);
    }, []);

  return (
    <div className="blog-details">
        <div className="contnr">
            <Blogwall>
                <ul className="blog-container">
                {paginatedData.map((blog) => (
                    <li className="blog-content-list" key={blog.slug}>
                        <Card
                            content={blog}
                            poster={blog.mediaLink}
                            title={blog.title}
                            description={blog.description}
                            url={`/blogs/${blog.slug}`}
                        />
                    </li>
                ))}
                </ul>
            </Blogwall>

            <div className="meets-events-pagination">
                <CustomPagination
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    </div>
  )
}

export default React.memo(BlogPage)