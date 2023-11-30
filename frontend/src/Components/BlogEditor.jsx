/* eslint-disable no-unused-vars */
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

const BlogEditor = ({ onEditorContentChange }) => {
  const handleEditorChange = (content, editor) => {
    onEditorContentChange(content);
  };

  return (
    <Editor
      apiKey="lejilam28j10k9d8gs3qvltezrkqytd5o7ozmog3y4noisc5"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

BlogEditor.propTypes = {
  onEditorContentChange: PropTypes.func.isRequired
};

export default BlogEditor;
