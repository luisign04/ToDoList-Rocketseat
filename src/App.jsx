import './global.css'
import Header from './components/Header.jsx'
import Create from './components/Create.jsx'
import Task from './components/Tasks.jsx'
import React, { useState } from 'react';

export default function App() {

  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (taskTitle) => {
    if (taskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }
  return (
    <div>
      <Header/>
      <Create onCreateTask={handleCreateTask}/>
      <Task tasks={tasks} setTasks={setTasks}/>

    </div>
  )
  
}

