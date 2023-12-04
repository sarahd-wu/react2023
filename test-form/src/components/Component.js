import React, { useState } from 'react';
import Text from './Text.js'
import Heading from './Heading.js';

function Component(props) {
    const {title = 'Default Title', description = 'Default Description', subcomponents = [] , level = 1 } = props;
    
    return (
        <div>
            <Heading text={title}
                     size={level} />
            <Text text={description} />
            {/* list of subcomponents*/}
            <ul>{Object.keys(subcomponents).map((subcomponentKey) => {
                const subcomponent = subcomponents[subcomponentKey]
                return(
                <li key={subcomponentKey}>
                    <Component 
                        title={subcomponent["Title"]}
                        description={subcomponent["Content"]}
                        subcomponents={subcomponent["Subcomponents"]}
                        level={level+1} />
                </li>
                )})}
            </ul>
        </div>
    );

}

export default Component;