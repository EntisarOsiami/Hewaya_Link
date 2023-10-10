import  { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CommentForm = ({ blogId }) => {
  const [formData, setFormData] = useState({
    text: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/comments', {
        text: formData.text,
        author: formData.author,
        blogId,
      });

      if (response.status === 201) {
        
        console.log('Comment created successfully');
        
        setFormData({
          text: '',
          author: '',
        });
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
    
  };

  return (
    <div>
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Comment Text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Comment
        </button>
      </form>
    </div>
    
  );
  
  
};
CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired, // Add this line for the blogId prop
};

export default CommentForm;
