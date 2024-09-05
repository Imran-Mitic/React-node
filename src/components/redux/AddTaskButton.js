import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './actions';

const AddTaskButton = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();

  const addNewTask = () => {
    const newTask = {
      id: Date.now(), // Générer un ID unique
      text: taskText
    };
    dispatch(addTask(newTask));
    setTaskText('');
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={addNewTask}>Ajouter</button>
    </div>
  );
};

export default AddTaskButton;