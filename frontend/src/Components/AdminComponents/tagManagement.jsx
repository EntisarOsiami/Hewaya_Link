import  { useState } from 'react';

const TagManagement = () => {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState('');

    const addTag = () => {
        if (input && !tags.includes(input)) {
            setTags([...tags, input]);
            setInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
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