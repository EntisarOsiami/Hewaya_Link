import Header from '../Components/Header'; 
import Footer from '../Components/Footer'; 
import PropTypes from 'prop-types';
import FAQChatbot from '../Components/ChatBot/FAQChatbot.jsx'; 
import 'react-chatbot-kit/build/main.css';

const UniversalLayout = ({ children }) => {
    // Renders a universal layout with a header, content, FAQ chatbot, and footer
    return (
        <div className="layout-wrapper">
            <Header />
            {children}
            <FAQChatbot />
            <Footer />
        </div>
    );
};

UniversalLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UniversalLayout;
