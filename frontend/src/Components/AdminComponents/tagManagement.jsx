import  { useState } from 'react';
import axios from 'axios';

const TagManagement = () => {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState('');

    const addTag = async () => {
        if (input && !tags.some(tag => tag.name === input)) {
          try {
            const response = await axios.post('/api/admin/tags/', { name: input });
            setTags([...tags, response.data.data]); 
            setInput('');
          } catch (error) {
            console.error('Error adding tag:', error);
          }
        }
      };
      
      const removeTag = async (tagToRemove) => {
        try {
          await axios.delete(`/api/admin/tags/${tagToRemove._id}`);
          setTags(tags.filter(tag => tag._id !== tagToRemove._id));
        } catch (error) {
          console.error('Error removing tag:', error);
        }
      };
      
    return (
        <div>
            <h1>Tags</h1>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTag}>Add Tag</button>
            {tags.map((tag, index) => (
                <div key={index}>
                    {tag}
                    <button onClick={() => removeTag(tag)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default TagManagement;