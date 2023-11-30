import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import BlogEditor from "./BlogEditor"; 

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const authorName = useSelector((state) => state.profile.user.username);
  const author = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onEditorContentChange = (editorContent) => {
    setContent(editorContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || content === "<p>Start writing your blog here...</p>") {
      toast.error("Content cannot be empty.");
      return;
    }

    try {
      await axios.post("/api/blogs", {
        title,
        content,
        author,
        category: selectedCategory,
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
        <BlogEditor onEditorContentChange={onEditorContentChange} />
        <p>Author: {authorName}</p>
        <p>Category:</p>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlog;
