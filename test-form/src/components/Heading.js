import React, {useState} from 'react';
import EditableContent from './EditableContent';

function Heading(props) {
    // State and functions specific to Heading
    const [headingText, setHeadingText] = useState(props.text);
    const headingSize = `h${props.size}`;
  
    return (
        React.createElement(headingSize, null,
        <EditableContent
          content={headingText}
          setContent={setHeadingText}
          className="heading"
        />)
    );
  };

  export default Heading;