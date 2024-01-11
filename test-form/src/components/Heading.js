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
          index = {props.index}
          updateJson = {props.updateJson}
          label = "Title"
        />)
    );
  };

  export default Heading;