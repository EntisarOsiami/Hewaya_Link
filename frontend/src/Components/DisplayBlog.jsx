import PropTypes from 'prop-types';
import CommentForm from '../Components/CommentForm.jsx'


const BlogPost = ({ title, content, author, createdAt, tags, comments, ratings }) => {
  return (
    <div className="blog-post card mb-4">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle text-muted">Author: {author}</p>
        <p className="card-subtitle text-muted">Created At: {new Date(createdAt).toLocaleDateString()}</p>
        <div className="tags">
          <p>Tags:</p>
          {tags.map((tag, index) => (
            <span key={index} className="badge bg-primary me-1">{tag}</span>
          ))}
        </div>
      
        <p className="card-text">{content}</p>
        <CommentForm/>
        <div className="comments">
          <h3>Comments:</h3>
          <ul className="list-group">
            {comments.map((comment) => (
              <li key={comment._id} className="list-group-item">
                <p>{comment.text}</p>
                <p className="card-subtitle text-muted">Comment by: {comment.author}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="ratings">
          <h3>Ratings:</h3>
          <ul className="list-group">
            {ratings.map((rating) => (
              <li key={rating._id} className="list-group-item">
                <p>Rating: {rating.value}</p>
                <p className="card-subtitle text-muted">Rated by: {rating.author}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BlogPost;
