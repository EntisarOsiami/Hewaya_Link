import { useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
import { Card,Form,FormControl } from "react-bootstrap";
import BlogDisplay from "../Components/BlogDisplay.jsx";
import CreateBlog from "../Components/CreateBlog";
import { useTranslation } from "react-i18next";
import axios from "axios";

const BlogScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("dateDesc");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        const { success, data } = response.data;
        if (success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const displayedBlogs = useMemo(() => {
    return blogs
      .filter(
        (blog) =>
          selectedCategory === "All" || blog.category === selectedCategory
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
  }, [blogs, selectedCategory, searchTerm, sortType]);

  const renderBlogCards = () => {
    if (loading) {
      return <p>{t("blogList:loading")}</p>;
    }

    if (error) {
      return <p>{t("blogList:error")}: {error}</p>;
    }

    if (!displayedBlogs.length) {
      return <p>{t("blogList:noBlogs")}</p>;
    }

    return displayedBlogs.map((blog) => (
      <div key={blog._id} >
        <Card>
          <Card.Img
            variant="top"
            src={blog.image || "/assets/cloud.png"}
            alt="Blog post"
            className="blog-image"
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
              onClick={() => navigate(`${blog._id}`)}
            >
              <span>{t("blogList:readMore")}</span>
            </button>
          </Card.Body>
        </Card>
      </div>
    ));
  };
  const location = useLocation();
  const isHomePage = location.pathname === '/blog' || location.pathname === '/blog/';
  const isRtl = () => {
    const rtlLanguages = ['ar', 'he', 'ur']; 
    return rtlLanguages.includes(i18n.language);
  };

  return (
        <div className={`app-container ${isRtl() ? 'rtl' : ''}`}> 
   
      <div className="app-blog-hero">
        <h1>{t("blogScreen:heroTitle")}</h1>
        <p>{t("blogScreen:heroSubtitle")}</p>
      </div>
  
      <div className="row">
        {/* Left Column for Controls and Home Button */}
        <div className="col-md-3">
          {isHomePage && (
            <div className="blog-controls">
              {/* Search Input */}
              <Form className="blog-search">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form>
  
              {/* Category Filter Dropdown */}
              <Form.Select
                className="category-filter"
                aria-label="Category filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All Categories</option>
                {/* Dynamically generate category options */}
              </Form.Select>
  
              {/* Sort Type Dropdown */}
              <Form.Select
                className="sort-type"
                aria-label="Sort type"
                value={sortType}
                onChange={handleSortTypeChange}
              >
                <option value="dateDesc">Newest First</option>
                <option value="dateAsc">Oldest First</option>
                <option value="nameAsc">Name Ascending</option>
                <option value="nameDesc">Name Descending</option>
              </Form.Select>
            </div>
          )}
  
          <button
            className="btn-custom mx-5"
            onClick={() => navigate(isHomePage ? "create" : "/blog")}
          >
            {isHomePage ? t("blogScreen:navCreateNew") : t("blogScreen:navHome")}
          </button>
        </div>
  
        {/* Right Column for Blog Display and Create Blog */}
        <div className="col-md-9">
          <Routes>
            <Route path="/" element={<div className="blog-list">{renderBlogCards()}</div>} />
            <Route path="create" element={<CreateBlog />} />
            <Route path=":blogId" element={<BlogDisplay />} />
          </Routes>
        </div>
      </div>
    </div>
  );
  
};

export default BlogScreen;