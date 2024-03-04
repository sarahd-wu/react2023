import React, { useState } from "react";
import Text from './Text.js';
import Heading from './Heading.js';

function Component(props) {
    const {
        componentKey = 'lol',
        title = '',
        description = '',
        subcomponents = {},
        parentTree = {},
        level = 1,
        setSubcomponentsArray,
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    const addComponent = () => {
        // Create a new subcomponent
        const newSubcomponent = {
            componentKey: 'Default',
            Title: 'Default',
            Content: 'Default',
            Subcomponents: {},

        };

        // Update the subcomponents array using the callback function from props
        if (setSubcomponentsArray) {
            setSubcomponentsArray((prevSubcomponents) => [
                ...prevSubcomponents,
                newSubcomponent
            ]);
        }

        // Return the new subcomponent to the caller (parent or child component)
        return newSubcomponent;
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
                {Object.entries(subcomponents)
                    .filter(([subcomponentKey]) => !subcomponentKey.includes("Item"))
                    .map(([subcomponentKey, subcomponent]) => (
                        <li key={subcomponentKey}>
                            {/* Pass the callback to the child components */}
                            <Component
                                componentKey={subcomponentKey}
                                title={subcomponent["Title"]}
                                description={subcomponent["Content"]}
                                subcomponents={subcomponent["Subcomponents"]}
                                parentTree={subcomponent}
                            />
                        </li>
                    ))}
            </ul>

            {isHovered && (
                <button onClick={addComponent}>
                    Hovered! Click me!
                </button>
            )}
        </div>
    );
}

export default Component;