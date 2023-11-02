import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


function Comment({ blogId, onNewComment }) {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState(null);

  const username = useSelector(state => state.profile.user.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/comments/${blogId}`, {
        text: commentText,
        author: username,
      });
      onNewComment(response.data.data);
      setCommentText('');
    } catch (err) {
      setError("Failed to post the comment.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Post a Comment:</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea 
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Your comment..."
          rows="4"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
Comment.propTypes = {
    blogId: PropTypes.string.isRequired,
    onNewComment: PropTypes.func.isRequired,
};

export default Comment;