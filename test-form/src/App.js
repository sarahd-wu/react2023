import Component from "./components/Component.js"
import React, { useState } from "react";
import components from "./components.json"

function App(props) {

  // const components = [
  //   {title: "Title", description: "I exist here", subcomponents: [
  //     {title: "Subtitle1", description: "I exist here", subcomponents: []},
  //     {title: "Subtitle2", description: "I exist here", subcomponents: []},
  //   ]},
  //   {title: "Title2", description: "I exist here2"}
  // ];

  return (
    <div>
    {Object.keys(components["Components"]).map((componentKey) => {

      //maps component headings to individual component units
      const component = components["Components"][componentKey];
      const title = component["Title"];
      const content = component["Content"];
      const subcomponents = component["Subcomponents"];

        return (
        <div key = {componentKey}>
          <Component 
            title={title} 
            description={content}
            subcomponents={subcomponents}
            level = {1} 
          />
        </div>
        );
  })}

  </div>  
  );
}

export default App;
