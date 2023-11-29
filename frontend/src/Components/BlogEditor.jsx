import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';


function BlogEditor({ onEditorChange }) {
  const handleEditorChange = (content, editor) => {
    onEditorChange(editor.getContent());
  };
  return (
    <div className="BlogEditor-container">
      <h2 className="BlogEditor-header">Blog Editor</h2>
      <div className="BlogEditor-toolbar"></div>
      <Editor
        apiKey="ew5zscg4rgau6k5a3niqbkhuspvrtyl8y65uhkll5lucv5k6"
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          menubar: 'file edit view insert format tools table',
          branding: false,
        }}
        initialValue="<p>Start writing your blog here...</p>"
        onChange={handleEditorChange}
        className="BlogEditor-editor"
      />
    </div>
  );
}

BlogEditor.propTypes = {
  onEditorChange: PropTypes.func.isRequired,
};

export default BlogEditor;
