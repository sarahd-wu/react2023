import React, {useState} from 'react';
import EditableContent from './EditableContent';

function Item(props) {
    // State and functions specific to Paragraph
    const [dateText, setDateText] = useState(props.date);
    const [boxText, setBoxText] = useState(props.box);
    const [folderText, setFolderText] = useState(props.folder);

  
    return (
      <div>
        <EditableContent
          content={dateText}
          setContent={setDateText}
          className="text"
        />
        <EditableContent
          content={boxText}
          setContent={setBoxText}
          className="text"
        />
        <EditableContent
          content={folderText}
          setContent={setFolderText}
          className="text"
        />
      </div>
    );
  };

  export default Item;