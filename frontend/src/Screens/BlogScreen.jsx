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

const BlogScreen = () => {
    return (
        <div className="app-container">
            <div className="app-blog-hero">
                <h1>Hewaya Blog</h1>
                <p>A blog for hobbyists by hobbyists</p>
            </div>

            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand as={Link} to="/blog/">Hewaya Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/blog/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/blog/create">Create New Blog</Nav.Link>
                            {/* Add other navigation links as needed */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main className="container">
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