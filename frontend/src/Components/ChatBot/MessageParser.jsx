/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("hello")) {
      actions.handleHello();
    }
    if (message.includes("reset password")) {
      actions.handleResetPassword();
    }
    if (message.includes("verify email")) {
      actions.handleVerifyEmail();
    }
    if (message.includes("sharing work")) {
      actions.handleSharingWork();
    }
    if (message.includes("blog posts")) {
      actions.handleBlogPosts();
    }
    if (message.includes("tutorials and guides")) {
      actions.handleTutorialsAndGuides();
    }
  };
  return (
    <div>
      {" "}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { parse: parse, actions });
      })}{" "}
    </div>
  );
};
MessageParser.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object,
};
export default MessageParser;
