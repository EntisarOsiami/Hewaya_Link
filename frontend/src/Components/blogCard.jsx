import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  return (
    <div className="blog-card">
      <Card>
        <Card.Img
          variant="top"
          src={blog.image || "/assets/cloud.png"}
          alt="Blog post"
          className="blog-image"
        />
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text className="blog-excerpt">{blog.excerpt}</Card.Text>
          <Card.Text className="text-muted">
            Posted by {blog.author.username} on{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </Card.Text>
          <button className="btn-custom" onClick={handleReadMoreClick}>
            Read More
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

BlogCard.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string,
        excerpt: PropTypes.string,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        image: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default BlogCard;
