import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        if (response.data.success && Array.isArray(response.data.data.blogs)) {
          setBlogs(response.data.data.blogs);
        } else {
          setError("Invalid data structure from the server.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch the blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!blogs.length) return <p>No blogs to display.</p>;

  return (
    <div className="blog-list-container">
      <div className="row">
        {blogs.map(blog => (
          <div key={blog._id} className="col-sm-12  mb-4">
            <Card className="blog-card h-100 shadow-sm">
              <Card.Img variant="top" src={blog.image || '/assets/cloud.png'} alt="Blog post" />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className="blog-excerpt">
                  {blog.excerpt}
                </Card.Text>
                <Card.Text className="text-muted">
                  Posted by {blog.author.username} on {new Date(blog.createdAt).toLocaleDateString()}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/blog/${blog._id}`)}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default BlogList;
