import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from './actions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteTask(task.id));
  };

  const editHandler = () => {
    const updatedText = prompt('Modifier la tâche:', task.text);
    if (updatedText) {
      const updatedTask = { ...task, text: updatedText };
      dispatch(editTask(updatedTask));
    }
  };

  return (
    <li>
      {task.text}
      <button onClick={editHandler}>Modifier</button>
      <button onClick={deleteHandler}>Supprimer</button>
    </li>
  );
};

export default TaskItem;