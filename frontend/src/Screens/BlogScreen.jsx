import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import BlogList from '../Components/BlogList';
import CreateBlog from '../Components/CreateBlog';

const BlogScreen = () => {
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [shouldRefetchBlogs, setShouldRefetchBlogs] = useState(false);

  const handleCreateBlogToggle = () => {
    setShowCreateBlog((prevState) => !prevState);
    if (!showCreateBlog) {
      setShouldRefetchBlogs(false); 
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Blog</span>
          <button
            className="btn btn-outline-primary"
            onClick={handleCreateBlogToggle}
            style={{ marginLeft: 'auto' }}
          >
            <BsPlus size={24} />
          </button>
        </div>
      </nav>
      <main>
        <div className="container mt-3">
          <BlogList shouldRefetch={shouldRefetchBlogs} onRefetch={() => setShouldRefetchBlogs(false)} />
          {showCreateBlog && <CreateBlog onClose={handleCreateBlogToggle} />}
        </div>
      </main>
    </div>
  );
};

export default BlogScreen;
