import React, { useState, useEffect } from "react";
import Component from "./components/Component.js";
import ContentList from "./components/ContentList.js";
import componentsData from "./components.json";

function App(props) {

  // Checks if the user is hovering over the component
  const [components, setComponents] = useState(null);

  useEffect(() => {
    setComponents(componentsData["Components"]);
  }, []);

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

              <Component
                label={componentKey}
                title={title}
                description={content}
                subcomponents={subcomponents}
                level={1}
                index={index}
                updateJson={updateJson}
              />
            
          );
        })}
        
    {/* Content List Section 
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
    </div> */}
    </div> 
  );
}

export default App;