import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const CommentSystem = ({ itemId, onModel }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const userId = useSelector((state) => state.auth.userId);

  const modelDisplayText = {
    Blog: "Post",
    Gallery: "Image",
    Portal: "Portal",
  };

  const displayText = modelDisplayText[onModel] || "Item";

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${onModel}/${itemId}`);
        setComments(response.data.data);
      } catch (err) {
        setError('Failed to load comments.');
        console.error('Error loading comments:', err);
      }
    };

    fetchComments();
  }, [itemId, onModel]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/api/comments', {
        text: commentText,
        author: userId,
        itemId,
        onModel,
      });
      setComments([...comments, response.data.data]);
      setCommentText('');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
      console.error('Error posting new comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comments-container">
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong className="comment-author">{comment.author.username}</strong>
            <p className="comment-text">{comment.text}</p>
            <small className="comment-date">{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          className="comment-textarea"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={`Write your comment about this ${displayText.toLowerCase()}...`}
          required
          disabled={submitting}
        />
        <button type="submit" className="comment-submit-btn" disabled={submitting || !commentText.trim()}>
          {submitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

CommentSystem.propTypes = {
  itemId: PropTypes.string.isRequired,
  onModel: PropTypes.string.isRequired,
};

export default CommentSystem;
