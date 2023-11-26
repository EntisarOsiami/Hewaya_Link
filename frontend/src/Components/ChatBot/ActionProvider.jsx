/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleHello = () => {
    const message = createChatBotMessage(
      "Hello there! What would you like to know more about?"
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };
  const handleResetPassword = () => {
    const message = createChatBotMessage(
      "To reset your password, please click the 'Reset Password' link and check your email for the reset link. Follow the instructions to set a new password."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const handleVerifyEmail = () => {
    const message = createChatBotMessage(
      "After signing up, you should receive an email with a verification link. Please check your inbox and click the link to verify your email."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const handleSharingWork = () => {
    const message = createChatBotMessage(
      "You can share your work in the gallery section. Other users can provide feedback and evaluations."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const handleBlogPosts = () => {
    const message = createChatBotMessage(
      "Our blog features articles from various hobbyists. You can learn and get inspired!"
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const handleTutorialsAndGuides = () => {
    const message = createChatBotMessage(
      "We have a range of tutorials and guides provided by community members. Just head over to the tutorials section!"
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  return (
    <div>
      {" "}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleBlogPosts,
            handleResetPassword,
            handleSharingWork,
            handleTutorialsAndGuides,
            handleVerifyEmail,
            handleHello,
          },
        });
      })}{" "}
    </div>
  );
};

ActionProvider.propTypes = {
  createChatBotMessage: PropTypes.func,
  setState: PropTypes.func,
  children: PropTypes.node,
};

export default ActionProvider;
