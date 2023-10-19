import  { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createBlogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().required(),
      tags: Joi.array().items(Joi.string())
    });

    const { error } = createBlogSchema.validate({ title, content, author, tags });

    if (error) {
      setError(error.details[0].message);
      return;
    }

    try {
      const response = await axios.post('/api/blogs', { title, content, author, tags });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
      </div>
      <div>
        <label htmlFor="tags">Tags:</label>
        <input type="text" id="tags" value={tags} onChange={(event) => setTags(event.target.value)} />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default CreateBlogForm;