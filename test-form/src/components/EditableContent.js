import React, {useState} from 'react';

function EditableContent(props) {
    const {content = 'Default', setContent = 'Default', toggleEditing = 'bleb' , isEditing = 'hah', className = "Text" } = props;

    const handleContentChange = (event) => {
      setContent(event.target.value);
    };
  
    return (
      <div onClick={toggleEditing}>
        {isEditing ? (
          <textarea
            type="text"
            class={className}
            value={content}
            onChange={handleContentChange}
            onBlur={toggleEditing}
          />
        ) : (
          <div>
            {content}
          </div>
        )}
      </div>
    );
  };

  export default EditableContent;