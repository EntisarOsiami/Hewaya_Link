import PropTypes from 'prop-types';

const BlogPostHeader = ({ title, author, date, tags }) => {
  return (
    <header className="blog-post-header">
      <h2 className="blog-title">{title}</h2>
      <div className="blog-meta">
        <span>Written by {author}</span>
        <span>Published on {date}</span>
      </div>
      {tags && <div className="blog-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
    </header>
  );
};

BlogPostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default BlogPostHeader;
