import React, {useState} from 'react';
import EditableContent from './EditableContent';

function Heading(props) {
    // State and functions specific to Heading
    const [headingText, setHeadingText] = useState(props.text);
    const headingSize = `h${props.size}`;
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
      setIsEditing((prevIsEditing) => !prevIsEditing);
    };
  
    return (
        React.createElement(headingSize, null,
        <EditableContent
          content={headingText}
          setContent={setHeadingText}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          className="heading"
        />)
    );
  };

  export default Heading;