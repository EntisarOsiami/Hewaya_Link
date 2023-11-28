// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogList from '../Components/BlogList';
import BlogDisplay from "../Components/BlogDisplay.jsx";
// import Categories from '../Components/Categories';
// import LatestPosts from '../Components/LatestPosts';
// import Popular from '../Components/Popular';
import CreateBlog from '../Components/CreateBlog';
import { useTranslation } from 'react-i18next';


const BlogScreen = () => {
    const { t } = useTranslation();
  
    return (
      <div className="app-container">
        <div className="app-blog-hero">
          <h1>{t('blogScreen:heroTitle')}</h1>
          <p>{t('blogScreen:heroSubtitle')}</p>
        </div>
  
        <Navbar collapseOnSelect className="blog-header" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/blog/">{t('blogScreen:navbarBrand')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/blog/">{t('blogScreen:navHome')}</Nav.Link>
                <Nav.Link as={Link} to="/blog/create">{t('blogScreen:navCreateNew')}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

            <main className="Blog-screen">
                <Routes>
                    <Route index element={<BlogList />} />
                    <Route path="create" element={<CreateBlog />} />
                    <Route path=":blogId" element={<BlogDisplay />}/>
                </Routes>
            </main>
        </div>
    );
};

export default BlogScreen;