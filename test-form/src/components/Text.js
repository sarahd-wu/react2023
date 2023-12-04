import React, {useState} from 'react';
import EditableContent from './EditableContent';

function Paragraph(props) {
    // State and functions specific to Paragraph
    const [paragraphText, setParagraphText] = useState(props.text);
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEditing = () => {
      setIsEditing((prevIsEditing) => !prevIsEditing);
    };
  
    return (
      <div>
        <EditableContent
          content={paragraphText}
          setContent={setParagraphText}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          className="text"
        />
      </div>
    );
  };

  export default Paragraph;