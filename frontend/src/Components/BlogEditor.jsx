import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

function BlogEditor({ handleEditorContent }) {
  const handleEditorChange = (content, editor) => {
    handleEditorContent(editor.getContent());
  };

  return (
    <div className="BlogEditor-container">
      <h2 className="BlogEditor-header">Blog Editor</h2>
      <div className="BlogEditor-toolbar">
      </div>
      <Editor
        apiKey='ew5zscg4rgau6k5a3niqbkhuspvrtyl8y65uhkll5lucv5k6'
        init={{
          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue="<p>Start writing your blog here...</p>"
        onChange={handleEditorChange}
        className="BlogEditor-editor"
        contentClassName="BlogEditor-editor-content"
      />
    </div>
  );
}

BlogEditor.propTypes = {
  handleEditorContent: PropTypes.func.isRequired,
};

export default BlogEditor;



