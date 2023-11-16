import Header from '../Components/Header'; 
import Footer from '../Components/Footer'; 
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UniversalLayout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Header className="layout-header" />
            <Container fluid className="layout-content">{children}</Container>
            <Footer className="layout-footer" />
        </div>
    );
};

UniversalLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UniversalLayout;
