import Component from "./components/Component.js"
import React, { useState } from "react";

function App(props) {

  const taskList = props.components?.map((component) => (
    <Component 
      title={component.title} 
      description={component.description} 
    />
    ));

  return (
    <div>
{/* 
    const componentsList = component
        .filter(FILTER_MAP[filter])
        ?.map((task) => (
        <Todo 
          id={task.id} 
          name={task.name} 
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        )); */}
      {taskList}
    </div>
  );
}

export default App;
