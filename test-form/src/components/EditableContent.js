import React, { useState, useRef, useEffect } from 'react';

function EditableContent(props) {
  //updateJson allows the original component (the original json file) to be changed when edited
  const { content = 'Default', setContent = 'Default', className = "Text", index, label, updateJson} = props;
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the currently edited textarea
    if (textareaRef.current && !textareaRef.current.contains(event.target)) {
      setIsEditing(false);
      updateJson(index, event.target.value, label)
    }
  };

  const handleTextareaClick = (event) => {
    // Prevent the click event from propagating to the outer div
    event.stopPropagation();
  };

  useEffect(() => {
    // Attach event listener for mousedown outside the specific textarea
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div onClick={toggleEditing}>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          type="text"
          className={className}
          value={content}
          onChange={handleContentChange}
          onClick={handleTextareaClick}
        />
      ) : (
        <div>
          {content}
        </div>
      )}
    </div>
  );
}

export default EditableContent;