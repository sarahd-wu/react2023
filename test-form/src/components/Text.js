import React, {useState} from 'react';
import EditableContent from './EditableContent';

function Paragraph(props) {
    // State and functions specific to Paragraph
    const [paragraphText, setParagraphText] = useState(props.text);

  
    return (
      <div>
        <EditableContent
          content={paragraphText}
          setContent={setParagraphText}
          className="text"
        />
      </div>
    );
  };

  export default Paragraph;