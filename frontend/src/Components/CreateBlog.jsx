import { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useSelector } from 'react-redux';
import { CgRemove } from 'react-icons/cg';

const CreateBlogForm = () => {
  const userId = useSelector((state) => state.auth.userId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const approvedTags = ['Photography', 'Travel', 'Cooking', 'Gardening', 'Writing', 'Digital Art', 'Drawing'];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createBlogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().required(),
    });

    const validationResult = createBlogSchema.validate({ title, content, author: userId });

    if (validationResult.error) {
      setError(validationResult.error.details[0].message);
      return;
    }

    try {
      const tags = [...selectedTags, newTag].join(',');
      await axios.post('/api/blogs', { title, content, author: userId, tags });
      setSuccess(true);
      setTitle('');
      setContent('');
      setSelectedTags([]);
      setNewTag('');
      setFormVisible(false); // Hide the form after successful submission
    } catch (err) {
      console.error(err);
      console.error("Error:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : "There was an issue posting the blog.");      
    }
  };

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags((prevTags) => [...prevTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCancel = () => {
    setFormVisible(false); // Hide the form when canceled
  };

  if (!isAuthenticated) {
    return <div>Please log in to create a blog post.</div>;
  }

  return (
    <div className="container mt-5">
      {formVisible ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" id="title" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content:</label>
            <textarea id="content" className="form-control" value={content} onChange={(event) => setContent(event.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags:</label>
            <div className="input-group">
              <select className="form-select" value={newTag} onChange={(event) => setNewTag(event.target.value)}>
                <option value="">Select a tag</option>
                {approvedTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <button type="button" className="btn btn-primary" onClick={handleAddTag}>
                Add
              </button>
            </div>
            <div className="mt-2">
              {selectedTags.map((tag) => (
                <span key={tag} className="badge bg-secondary me-2">
                  {tag}
                  <CgRemove className="ms-1" onClick={() => handleRemoveTag(tag)} />
                </span>
              ))}
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Blog created successfully!</div>}
          <button type="submit" className="btn btn-success me-2" onClick={handleSubmit}>Submit</button >
          <button type="button" className="btn btn-danger" onClick={handleCancel}>
            <CgRemove className="me-1" />
            Cancel
          </button>
        </form>
      ) : (
        <button className="btn btn-primary" onClick={() => setFormVisible(true)}>Create Blog</button>
      )}
    </div>
  );
};

export default CreateBlogForm;
