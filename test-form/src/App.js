import React, { useState } from 'react';

const TreeNode = ({ node, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(node.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(node, editedTitle);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={editedTitle} onChange={handleTitleChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <div onClick={handleEditClick}>{node.title}</div>
          {node.children.length > 0 && (
            <ul>
              {node.children.map((child) => (
                <li key={child.componentKey}>
                  <TreeNode node={child} onEdit={onEdit} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const Tree = ({ treeData, onEdit }) => {
  return <TreeNode node={treeData} onEdit={onEdit} />;
};

const App = () => {
  const treeData = {
    componentKey: 'Root',
    title: 'Root Node',
    children: [
      {
        componentKey: 'Node1',
        title: 'Node 1',
        children: [
          {
            componentKey: 'Node1.1',
            title: 'Node 1.1',
            children: [],
          },
          {
            componentKey: 'Node1.2',
            title: 'Node 1.2',
            children: [],
          },
        ],
      },
      {
        componentKey: 'Node2',
        title: 'Node 2',
        children: [],
      },
    ],
  };
  

  const handleNodeEdit = (editedNode, editedTitle) => {
    // Update the parent's information here
    console.log('Edited Node:', editedNode);
    console.log('New Title:', editedTitle);
  };

  return (
    <div>
      <h1>React Tree Structure</h1>
      <Tree treeData={treeData} onEdit={handleNodeEdit} />
    </div>
  );
};

export default App;