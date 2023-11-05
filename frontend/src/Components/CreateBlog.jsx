import { useState } from "react";
import axios from "axios";
import BlogEditor from "./BlogEditor";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const authorName = useSelector((state) => state.profile.user.username);
  const author = useSelector((state) => state.auth.userId);
  

  const handleEditorContent = (editorContent) => {
    setContent(editorContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console log the values to make sure they are correct
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Author:", author);
    console.log("Tags:", tags);

    try {
      const response = await axios.post("/api/blogs", {
        title,
        content,
        author,
        tags,
      });
      console.log(response.data);
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
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateBlog;
