import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const BlogList = ({ shouldRefetch, onRefetch }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        console.log("Blogs received:", response.data.blogs);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error(error);
      }
   };
   
    fetchBlogs();

    if (shouldRefetch) onRefetch(); 
  }, [shouldRefetch, onRefetch]);

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>Author: {blog.author}</p>
          <p>Tags: {blog.tags.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
};

BlogList.propTypes = {
  shouldRefetch: PropTypes.bool.isRequired,
  onRefetch: PropTypes.func.isRequired,
};
export default BlogList;
