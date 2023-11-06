import React, { useState } from "react";
import DescriptionString from "./DescriptionString.js";

function Component(props){
  return ( 
    <div>
      <DescriptionString string={props.title} />
      <DescriptionString string={props.description} />
    </div>
  );
}

export default Component;