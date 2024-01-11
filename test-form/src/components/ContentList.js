import React from 'react';
import Item from './Item.js';
import Text from './Text.js';
import Heading from './Heading.js';

function ContentList(props) {
  const {
    label = 'Default Key',
    title = 'Default Title',
    description = 'Default Description',
    component = null,
    subcomponents = [],
    level = 1
  } = props;

  if (label.includes("Series") && !label.includes("Series Description")) {

    return (
      <div>
        <Heading text={label + ": " + title} size={level} />
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Date</th>
              <th>Box</th>
              <th>Folder</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over subcomponents and render a row for each item */}
            {Object.entries(subcomponents).map(([subcomponentKey, subcomponent]) => (
              <tr key={subcomponentKey}>
                {/* Additional cells for Date, Box, Folder */}
                <td><Text text={subcomponent["Title"]} /></td>
                <td><Text text={subcomponent["Date"]} /></td>
                <td><Text text={subcomponent["Box"]} /></td>
                <td><Text text={subcomponent["Folder"]} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul>
                {Object.entries(subcomponents)
                    .filter(([subcomponentKey]) => !subcomponentKey.includes("Item"))
                    .map(([subcomponentKey, subcomponent]) => (
                    <li key={subcomponentKey}>
                        <ContentList
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
    ); }

    if (label.includes("Series Description")) {
        return(
        <ul>
                {Object.entries(subcomponents)
                    .filter(([subcomponentKey]) => !subcomponentKey.includes("Item"))
                    .map(([subcomponentKey, subcomponent]) => (
                    <li key={subcomponentKey}>
                        <ContentList
                            label={subcomponentKey}
                            title={subcomponent["Title"]}
                            description={subcomponent["Content"]}
                            subcomponents={subcomponent["Subcomponents"]}
                            level={level + 1}
                        />
                    </li>
                ))}
        </ul>
        )
    }

  // Add additional rendering logic for other cases if needed

  // If none of the conditions match, return a default message or null
  return null;
}

export default ContentList;