import React, { useState, useEffect } from "react";
import Text from './Text.js'
import Heading from './Heading.js';

function Component(props) {
    const {
        componentKey = 'lol',
        title = 'Default Title',
        description = 'Default Description',
        subcomponents = [],
        level = 1,
        index,
        updateJson
    } = props;

    const [components, setComponents] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

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

    const jsonProps = { index, updateJson };
    
        return (
            
        <div
            key={componentKey}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Heading text={index + props.title} size={level} {...jsonProps} />
            <Text text={description} {...jsonProps} label = "Content" />

            {/* list of subcomponents*/}
            <ul>
                {Object.entries(subcomponents)
                    .filter(([subcomponentKey]) => !subcomponentKey.includes("Item"))
                    .map(([subcomponentKey, subcomponent]) => (
                    <li key={subcomponentKey}>
                        <Component
                            title={subcomponent["Title"]}
                            description={subcomponent["Content"]}
                            subcomponents={subcomponent["Subcomponents"]}
                            level={level + 1}
                            {...jsonProps}
                        />
                    </li>
                ))}
            </ul>
            {hoveredIndex === index && (
                <div>
                  <button onClick={() => addNewComponent(index + 1)}> Add New Component </button>
                  <button onClick={() => makeSubcomponent(index)}> Make Subcomponent </button>
                </div>
              ) }
        </div>
    );
}

export default Component;