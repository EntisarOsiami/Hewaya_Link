import { useState, useEffect } from "react";
import axios from "axios";

const CategoriesManagement = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/admin/category/");
      setAllCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await editCategory(currentCategory._id, currentCategory);
    } else {
      await createCategory(currentCategory);
    }
    resetForm();
  };

  const resetForm = () => {
    setCurrentCategory({ name: "" });
    setIsEditing(false);
  };

  const createCategory = async (category) => {
    try {
      await axios.post("/api/admin/category/", category);
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const editCategory = async (id, updatedCategory) => {
    try {
      await axios.put(`/api/admin/category/${id}/`, updatedCategory);
      fetchCategories();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setCurrentCategory({ ...currentCategory, name: e.target.value });
  };

  return (
    <div className="mod-category-management">
      <h1 className="mod-category-management-title">Categories Management</h1>

      <form className="mod-category-management-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentCategory.name}
          onChange={handleChange}
          placeholder="Category Name"
        />
        <button className="btn-custom" type="submit">
          {isEditing ? "Update Category" : "Create Category"}
        </button>
        {isEditing && (
          <button className="btn-custom" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {allCategories.map((category) => (
        <div key={category._id}>
          <h2 className="mod-category-management-name">{category.name}</h2>
          <button
            className="btn-custom"
            onClick={() => handleEditClick(category)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesManagement;
