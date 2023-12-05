import { useState, useEffect } from "react";
import axios from "axios";

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("/api/admin/tags");
      setTags(response.data.data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const addTag = async (event) => {
    event.preventDefault();
    if (input && !tags.some((tag) => tag.name === input)) {
      try {
        const response = await axios.post("/api/admin/tags/", { name: input });
        setTags([...tags, response.data.data]);
        setInput("");
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  const removeTag = async (tagToRemove) => {
    try {
      await axios.delete(`/api/admin/tags/${tagToRemove._id}`);
      setTags(tags.filter((tag) => tag._id !== tagToRemove._id));
    } catch (error) {
      console.error("Error removing tag:", error);
    }
  };

  return (
    <div className="mod-tag-management">
      <h1 className="mod-tag-management-title">Tags</h1>
      <form className="mod-tag-management-input" onSubmit={addTag}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn-custom" type="submit">
          Add Tag
        </button>
      </form>

      {tags.map((tag) => (
        <div className="mod-tag-management-name" key={tag._id}>
          {tag.name}
          <button className="btn-custom" onClick={() => removeTag(tag)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagManagement;
