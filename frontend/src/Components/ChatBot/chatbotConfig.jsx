import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";

const botName = "Hobbyist Helper";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. What would you like to know more about?`, {
      widget: "hobbyistOptions",
    }),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "hobbyistOptions",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;
