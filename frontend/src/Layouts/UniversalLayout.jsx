import Header from '../Components/Header'; 
import Footer from '../Components/Footer'; 
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
const UniversalLayout = ({ children }) => {
    return (
        <div className={`d-flex flex-column min-vh-100 `}>
            <Header />
            <Container fluid  className="flex-grow-1 md-1 justify-content center gx-0 ">{children}</Container>
            <Footer />
        </div>
    );
};

UniversalLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UniversalLayout;
