import { useState } from 'react';
import { Button } from 'react-bootstrap';
import BlogList from '../Components/BlogList';
import CreateBlog from '../Components/CreateBlog';
const BlogScreen = () => {
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  const handleCreateBlogClick = () => {
    setShowCreateBlog(true);
  };

  const handleCreateBlogClose = () => {
    setShowCreateBlog(false);
  };

  return (
    <>
      <Button onClick={handleCreateBlogClick}>Create Blog</Button>
      <BlogList />
      {showCreateBlog && <CreateBlog onClose={handleCreateBlogClose} />}
    </>
  );
};

export default BlogScreen;