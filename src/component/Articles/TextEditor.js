import React from 'react';
import ReactQuill from 'react-quill';
import './Article.css'
import 'react-quill/dist/quill.snow.css';

// Rich text editor
function TextEditor(props) {
    return (
        <ReactQuill
            theme="snow"
            value={props.value}
            onChange={props.onChangeValue}
            modules={TextEditor.modules}
            formats={TextEditor.formats}
            placeholder={props.placeholder}
        />
    );
}
// customize toolbar
var toolbar = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
]

// handle update pic by url link
function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;

    tooltip.save = function () {
        const range = this.quill.getSelection(true);
        const value = tooltip.textbox.value;
        if (value) {
            this.quill.insertEmbed(range.index, 'image', value, 'user');
        }
    };
    // Called on hide and save.
    tooltip.hide = function () {
        tooltip.save = originalSave;
        tooltip.hide = originalHide;
        tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Enter image link...';
}

TextEditor.modules = {
    toolbar: {
        container: toolbar,
        handlers: {
            image: imageHandler
        }
    },
    clipboard: {
        matchVisual: false,
    }
}

TextEditor.formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
]

export default TextEditor;
