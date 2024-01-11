import React, { useState, useEffect } from "react";
import Component from "./components/Component.js";
import ContentList from "./components/ContentList.js";
import componentsData from "./components.json";

function App(props) {

  // Checks if the user is hovering over the component
  const [components, setComponents] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setComponents(componentsData["Components"]);
  }, []);

  const addNewComponent = (index) => {
    // Assuming your new component data is entered through some UI form
    const newComponent = {
      Title: "New Component",
      Content: "New Content",
      Subcomponents: []
    };

    // Update the state with the new component inserted at the specified index
    setComponents((prevComponents) => {
      const newComponents = { ...prevComponents };
      const newKey = Date.now().toString();

      // Insert the new component at the specified index
      const keys = Object.keys(newComponents);
      keys.splice(index, 0, newKey);

      // Create a copy of the components with the new component added
      const updatedComponents = keys.reduce((acc, key) => {
        acc[key] = key === newKey ? newComponent : newComponents[key];
        return acc;
      }, {});

      return updatedComponents;
    });
  };

  const downloadJsonFile = () => {
    if (!components) {
      console.error('No components data to download.');
      return;
    }

    const jsonContent = JSON.stringify(components, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'components.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={downloadJsonFile}>Download JSON</button>

      {components &&
        Object.keys(components).map((componentKey, index) => {
          const component = components[componentKey];
          const title = component["Title"];
          const content = component["Content"];
          const subcomponents = component["Subcomponents"];

          return (
            <div
              key={componentKey}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >

              <Component
                label={componentKey}
                title={title}
                description={content}
                subcomponents={subcomponents}
                level={1}
              />

              {hoveredIndex === index && (
                <button onClick={() => addNewComponent(index + 1)}> Add New Component </button>
              ) }
              
            </div>
          );
        })}
        
    {/* Content List Section */}
    <div>
        <h1>Content List</h1>
        { components &&
          Object.keys(components).map((componentKey, index) => {
            const component = components[componentKey];
            const title = component["Title"];
            const content = component["Content"];
            const subcomponents = component["Subcomponents"];

            // Customize the rendering for the "Content List" section
            return (
              <div
              key={componentKey}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >

              <ContentList
                label={componentKey}
                title={title}
                description={content}
                subcomponents={subcomponents}
                component = {component}
                level={2}
              />

              {hoveredIndex === index && (
                <button onClick={() => addNewComponent(index + 1)}> Add New Component </button>
              ) }
              
            </div>
            );
          })}
        </div>

    </div>
  );
}

export default App;