import  { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get('/api/admin/category/');
        setCategories(response.data.data);
    };
    
    const createCategory = async (category) => {
        const response = await axios.post('/api/admin/category/', category);
        console.log(response.data);
        fetchCategories(); 
    };
    
    const editCategory = async (id, updatedCategory) => {
        const response = await axios.put(`/api/admin/category/${id}/`, updatedCategory);
        console.log(response.data);
        fetchCategories(); 
    };
    
    const deleteCategory = async (id) => {
        const response = await axios.delete(`/api/admin/category/${id}/`);
        console.log(response.data);
        fetchCategories(); 
    };
    

    return (
        <div>
            <h1>Categories Management</h1>
            <button onClick={createCategory}>Create Category</button>
            {categories.map(category => (
                <div key={category._id}>
                    <h2>{category.name}</h2>
                    <button onClick={() => editCategory(category._id)}>Edit</button>
                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default CategoriesManagement;