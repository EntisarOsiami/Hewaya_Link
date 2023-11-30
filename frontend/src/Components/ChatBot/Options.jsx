import PropTypes from 'prop-types';

const Options = (props) => {
  const options = [
    { text: "Reset Password", handler: props.actionProvider.handleResetPassword, id: 1 },
    { text: "Blog Posts", handler: props.actionProvider.handleBlogPosts, id: 2 },
    { text: "Tutorials & Guides", handler: props.actionProvider.handleTutorialsAndGuides, id: 3 },
    { text: "Sharing Work", handler: props.actionProvider.handleSharingWork, id: 4},
    { text: "Verify Email", handler: props.actionProvider.handleVerifyEmail, id: 5 },
  ];

  return (
    <div className="options-container">
      {options.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
          {option.text}
        </button>
      ))}
    </div>
  );
};
Options.propTypes = {
    actionProvider: PropTypes.object.isRequired,
};


export default Options;
