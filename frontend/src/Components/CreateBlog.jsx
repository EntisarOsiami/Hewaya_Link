import { useState, useEffect } from "react";
import axios from "axios";
import BlogEditor from "./BlogEditor";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const authorName = useSelector((state) => state.profile.user.username);
  const author = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditorContent = (editorContent) => {
    setContent(editorContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/blogs", {
        title,
        content,
        author,
        category: selectedCategory 
      });
      toast.success("Blog created successfully!");
    } catch (error) {
      console.error("Error creating the blog:", error);
      toast.error("Error creating the blog. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <BlogEditor handleEditorContent={handleEditorContent} />

       

        <p>Author: {authorName}</p>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select a Category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlog;
