import React from 'react';
import Text from './Text.js'
import Heading from './Heading.js';

function Component(props) {
    const {
        label = 'Default Key',
        title = 'Default Title',
        description = 'Default Description',
        subcomponents = [],
        level = 1
    } = props;
    
        return (
        <div>
            <Heading text={title} size={level} />
            <Text text={description} />

            {/* list of subcomponents*/}
            <ul>
                {Object.entries(subcomponents)
                    .filter(([subcomponentKey]) => !subcomponentKey.includes("Item"))
                    .map(([subcomponentKey, subcomponent]) => (
                    <li key={subcomponentKey}>
                        <Component
                            label={subcomponentKey}
                            title={subcomponent["Title"]}
                            description={subcomponent["Content"]}
                            subcomponents={subcomponent["Subcomponents"]}
                            level={level + 1}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Component;