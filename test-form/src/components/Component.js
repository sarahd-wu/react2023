import React from 'react';
import Text from './Text.js'
import Heading from './Heading.js';

function Component(props) {
    const {
        title = 'Default Title',
        description = 'Default Description',
        subcomponents = [],
        level = 1,
        index,
        updateJson
    } = props;

    const jsonProps = { index, updateJson };
    
        return (
        <div>
            <Heading text={props.title} size={level} {...jsonProps} />
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
        </div>
    );
}

export default Component;