// DescriptionString.js
import React from 'react';
import AbstractString from './AbstractString.js';

function DescriptionString(props){
    const stringType = () => {
        return props.string;
      };
    
      return <AbstractString 
        props = {props}
        string = {stringType}/>;
}

export default DescriptionString;