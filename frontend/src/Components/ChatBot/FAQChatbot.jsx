import { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbotConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import MessageParser from "./MessageParser.jsx";
import ActionProvider from "./ActionProvider.jsx";


const FAQChatbot = () => {
  const [open, setOpen] = useState(false);

  const toggleBot = () => {
    setOpen(!open);
  };

  return (
    <div className="faq-chatbot-container">
      {open && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
      <button onClick={toggleBot} className="faq-chatbot-button">
        <FontAwesomeIcon icon={faComments} />
      </button>
    </div>
  );
};

export default FAQChatbot;
