import { useEffect, useState } from "react";
import axios from "axios";
import CommentSystem from "./CommentSystem.jsx"; 
import RatingSystem from "./RatingSystem.jsx";
import { useParams, useNavigate } from 'react-router-dom';


const BlogDisplay = () => {
  const { blogId } = useParams(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blogs/${blogId}`);
        if (isMounted) {
          setBlog(response.data.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch blog:', err);
          setError(err.response ? err.response.data.message : "An error occurred while fetching blog.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlog();

    return () => (isMounted = false);
  }, [blogId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


const renderBlog = () => {
  const { title, content, author, tags } = blog;

  return (
    <article className="blog-article">
      <h2>{title}</h2>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />
      <p className="blog-author">Author: {author.username}</p>

      <section className="comments-section">
        <h3>Comments:</h3>
        <CommentSystem itemId={blogId} onModel="Blog" />
      </section>

      <RatingSystem itemId={blogId} onModel="Blog" />

      <ul className="blog-tags">
        {tags.map((tag) => (
          <li className="blog-tag-item" key={tag}>{tag}</li>
        ))}
      </ul>

      <button  className="btn-custom" onClick={() => navigate(-1)}>Back to Blog List</button>
    </article>
  );
};

  return (
    <div className="article-container">
      {blog && renderBlog()}
    </div>
  );
};

export default BlogDisplay;
