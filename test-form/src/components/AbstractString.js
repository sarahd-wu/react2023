import React, { useState } from "react";

function String(props){
  const stringType = () => {
    throw new Error('Child component must override the stringType')
  };

  const [isEditing, setEditing] = useState(true);
  const [newName, setNewName] = useState(props.string)

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSave() {
    setEditing(!isEditing);
  }

  const editingTemplate = (
  <form>
    <label for="field1">Field 1:</label>
    <input type="text" id="field1" name="field1" value={newName} onChange={handleChange} />
    {/* <input type="submit" value="Save" onSubmit={handleSave} /> */}
  </form>
  )

  const viewTemplate = (
    <div>
      {newName}
    </div>
  )

    return (
      <div>
        {isEditing ? editingTemplate : viewTemplate }
        <button onClick={() => handleSave()}>Edit</button>
      </div>
      );
}
export default String;