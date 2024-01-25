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
      Subcomponents: {}
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


  const makeSubcomponent = (index) => {
    if (index !== null && index > 0) {
      setComponents((prevComponents) => {
        const newComponents = { ...prevComponents };
  
        // Get the selected component and the one above it
        const selectedKey = Object.keys(newComponents)[index];
        const aboveKey = Object.keys(newComponents)[index - 1];
  
        // Make a copy of the selected component
        const selectedComponent = { ...newComponents[selectedKey] };
  
        // Remove the selected component from the top level
        delete newComponents[selectedKey];
  
        // Make it a subcomponent of the component above
        newComponents[aboveKey].Subcomponents = newComponents[aboveKey].Subcomponents || {};
        newComponents[aboveKey].Subcomponents[selectedKey] = selectedComponent;
  
        return newComponents;
      });
    }
  };

  const updateJson = (index, newTitle, key) => {
    setComponents((prevComponents) => {
      const updatedComponents = { ...prevComponents };
      const componentKey = Object.keys(updatedComponents)[index];
      // console.log(updatedComponents[componentKey][key])
      updatedComponents[componentKey][key] = newTitle;

      // console.log(updatedComponents)

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
                index={index}
                updateJson={updateJson}
              />

              {hoveredIndex === index && (
                <div>
                  <button onClick={() => addNewComponent(index + 1)}> Add New Component </button>
                  <button onClick={() => makeSubcomponent(index)}> Make Subcomponent </button>
                </div>
              ) }

              
            </div>
            
          );
        })}
        
    {/* Content List Section */}
    <div>
        <h1>Content List</h1>
        { components &&
          Object.keys(components).map((componentKey, index_int) => {
            const component = components[componentKey];
            const title = component["Title"];
            const content = component["Content"];
            const subcomponents = component["Subcomponents"];

            const index = parseFloat(index_int)

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
                index={index}
                updateJson={updateJson}
              />

              {hoveredIndex === index && (
                <div>
                  <button onClick={() => addNewComponent(index + 1)}> Add New Component </button>
                </div>
              ) }
              
            </div>
            );
          })}
        </div>
    </div>
  );
}

export default App;