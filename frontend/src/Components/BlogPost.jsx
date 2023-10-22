import PropTypes from 'prop-types';
import BlogPostHeader from './BlogPostHeader';

const BlogPost = ({ post }) => {
  return (
    <article>
      <BlogPostHeader 
        title={post.title}
        author={post.author}
        date={post.date}
        tags={post.tags}
      />
      <p>{post.content}</p>
      
    </article>
  );
};

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
  }).isRequired,
};

export default BlogPost;
