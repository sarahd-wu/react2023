import React, { useState } from "react";
import Text from './Text.js';
import Heading from './Heading.js';

function Component(props) {
    const {
        componentKey = 'lol',
        title = '',
        description = '',
        subcomponents = {},
        level = 1,
        onDelete // Callback to handle delete action
    } = props;

    const [isHovered, setIsHovered] = useState(false);
    const [currentSubcomponents, setSubcomponents] = useState(subcomponents);

    const addNewComponent = () => {
        // Assuming your new component data is entered through some UI form
        const newComponent = {
            Title: "New Component",
            Content: "New Content",
            Subcomponents: {}
        };

        // Update the subcomponents array of the current component
        setSubcomponents({
            ...currentSubcomponents,
            [generateUniqueKey()]: newComponent,
        });
    };

    const handleDelete = (subcomponentKey) => {
        // Check if the componentKey exists in components
        if (!(subcomponentKey in currentSubcomponents)) {
            return;
        } else {
            // Copy the current state and delete the specified componentKey
            const updatedSubcomponents = { ...currentSubcomponents };
            delete updatedSubcomponents[subcomponentKey];
            setSubcomponents(updatedSubcomponents);
        }
    };

    const deleteComponent = () => {
        // Callback to handle delete action
        onDelete(componentKey);
    };

    const generateUniqueKey = () => {
        // Use a base string (e.g., 'componentKey') and append a timestamp for uniqueness
        const baseString = 'componentKey';
        const timestamp = new Date().getTime();
    
        // Concatenate the base string and timestamp to create a unique key
        const uniqueKey = `${baseString}_${timestamp}`;
    
        return uniqueKey;
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Heading text={title} size={level} />
            <Text text={description} label="Content" />

            {/* List of subcomponents */}
            <ul>
                {Object.entries(currentSubcomponents)
                    .filter(([subcomponentKey]) => !subcomponentKey.includes("Item"))
                    .map(([subcomponentKey, subcomponent]) => (
                        <li key={subcomponentKey}>
                            {/* Pass the callback to the child components */}
                            <Component
                                componentKey={subcomponentKey}
                                title={subcomponent["Title"]}
                                description={subcomponent["Content"]}
                                subcomponents={subcomponent["Subcomponents"]}
                                onDelete={handleDelete}
                            />
                        </li>
                    ))}
            </ul>

            {isHovered && (
                <div>
                    <button onClick={addNewComponent}> New Subcomponent of {title} </button>
                    <button onClick={deleteComponent}> Delete {title} </button>
                </div>
            )}
        </div>
    );
}

export default Component;
