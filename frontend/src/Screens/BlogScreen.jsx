import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogDisplay from '../Components/BlogDisplay.jsx';
import CreateBlog from '../Components/CreateBlog.jsx';

const BlogScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blogs');
                if (response.data.success && Array.isArray(response.data.data.blogs)) {
                    setBlogs(response.data.data.blogs);
                } else {
                    setError("Invalid data structure from the server.");
                }
                
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch the blogs.");
                setLoading(false);
            }
        };
        

        fetchBlogs();
    }, []);

    const handleBlogSelection = (blogId) => {
        setSelectedBlogId(blogId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Welcome to Our Blog</h1>

            <button onClick={() => setSelectedBlogId('create')}>Create a New Blog Post</button> 
            
            {selectedBlogId && selectedBlogId !== 'create' && (
                <BlogDisplay blogId={selectedBlogId} />
            )}

            {selectedBlogId === 'create' && (
                <CreateBlog />
            )}

            <ul>
                {blogs.map(blog => (
                    <li key={blog._id}>
                        <Link to="#" onClick={() => handleBlogSelection(blog._id)}>
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                            <span>By: {blog.author.username}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogScreen;
