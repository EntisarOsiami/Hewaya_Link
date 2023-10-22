// QuillEditor.js
import  { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function QuillEditor(props) {
    const editorContainer = useRef(null);
    let quillInstance = null;

    const quillInstanceRef = useRef(null);

    useEffect(() => {
        if (editorContainer.current) {
            quillInstanceRef.current = new Quill(editorContainer.current, {
                theme: 'snow'
            });
        }

        return () => {
            if (quillInstanceRef.current) {
                // Cleanup actions if needed
            }
        };
    }, []);

    const getContent = () => {
        return quillInstance.root.innerHTML;
    };

    return (
        <div ref={editorContainer}></div>
    );
}

export default QuillEditor;
