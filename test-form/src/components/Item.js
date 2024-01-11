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
          index = {props.index}
          updateJson = {props.updateJson}
          label = "Date"
        />
        <EditableContent
          content={boxText}
          setContent={setBoxText}
          className="text"
          index = {props.index}
          updateJson = {props.updateJson}
          label = "Box"
        />
        <EditableContent
          content={folderText}
          setContent={setFolderText}
          className="text"
          index = {props.index}
          updateJson = {props.updateJson}
          label = "Folder"
        />
      </div>
    );
  };

  export default Item;