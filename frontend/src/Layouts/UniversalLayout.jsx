import Header from '../Components/Header'; 
import Footer from '../Components/Footer'; 
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'; 

const UniversalLayout = ({ children }) => {
    const theme = useSelector((state) => state.theme.currentTheme); 

    const backgroundColorClass = theme === 'light' ? 'light-background' : 'dark-background';

    return (
        <div className={`d-flex flex-column min-vh-100 ${backgroundColorClass}`}>
            <Header />
            <Container className="flex-grow-1">{children}</Container>
            <Footer />
        </div>
    );
};

UniversalLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UniversalLayout;
