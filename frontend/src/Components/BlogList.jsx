import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("dateDesc");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blogs");
        const {
          success,
          data: { blogs },
        } = data;
        if (success && Array.isArray(blogs)) {
          setBlogs(blogs);
        } else {
          setError("Invalid data structure from the server.");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch the blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayedBlogs = blogs
    .filter(
      (blog) => selectedCategory === "All" || blog.category === selectedCategory
    )
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortType) {
        case "dateDesc": // Sort by date descending
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "dateAsc": // Sort by date ascending
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "nameAsc": // Sort by name ascending
          return a.title.localeCompare(b.title);
        case "nameDesc": // Sort by name descending
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const renderBlogCards = () => {
    if (loading) {
      return <p>{t("blogList:loading")}</p>;
    }

    if (error) {
      return (
        <p>
          {t("blogList:error")}: {error}
        </p>
      );
    }

    if (!displayedBlogs.length) {
      return <p>{t("blogList:noBlogs")}</p>;
    }

    return (
      <div className="blog-cards-container">
        {displayedBlogs.map((blog) => (
          <div key={blog._id} className="blog-card-wrapper">
            <Card className="blog-card">
              <Card.Img
                variant="top"
                src={blog.image || "/assets/cloud.png"}
                alt="Blog post"
              />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className="blog-excerpt">{blog.excerpt}</Card.Text>
                <Card.Text className="text-muted">
                  Posted by {blog.author.username} on{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Card.Text>
                <button
                  className="btn-custom"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  <span>{t("blogList:readMore")}</span>
                </button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="blog-list-container">
      <div className="filter-sort-controls">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-filter"
        >
          <option value="All">
            All Categories {/* Add more category options here */}
          </option>
          {/* Add more category options here */}
        </select>
        <select
          value={sortType}
          onChange={handleSortTypeChange}
          className="sort-selector"
        >
          <option value="dateDesc">Sort by Date (Newest First)</option>
          <option value="dateAsc">Sort by Date (Oldest First)</option>
          <option value="nameAsc">Sort by Name (A-Z)</option>
          <option value="nameDesc">Sort by Name (Z-A)</option>
        </select>
      </div>

      {renderBlogCards()}
    </div>
  );
};

export default BlogList;
