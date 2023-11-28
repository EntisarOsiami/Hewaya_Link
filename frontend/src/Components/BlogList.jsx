import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();


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
 
  if (loading) return <p>{t('blogList:loading')}</p>;
  if (error) return <p>{t('blogList:error')}: {error}</p>;

  if (!blogs.length) return <p>{t('blogList:noBlogs')}</p>;

  return (
    <div className="blog-list-container">
      <div className="">
        {blogs.map(blog => (
          <div key={blog._id} className="">
            <Card className="blog-card">
              <Card.Img variant="top" src={blog.image || '/assets/cloud.png'} alt="Blog post" />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className="blog-excerpt">
                  {blog.excerpt}
                </Card.Text>
                <Card.Text className="text-muted">
                  Posted by {blog.author.username} on {new Date(blog.createdAt).toLocaleDateString()}
                </Card.Text>
                <button className="btn-custom" onClick={() => navigate(`/blog/${blog._id}`)}>
                <span>{t('blogList:readMore')}</span></button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default BlogList;
