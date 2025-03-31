import React from 'react';
import styles from './Tasks.module.css';
import emptyLogo from '../assets/emptyLogo.png';
import trashIcon from '../assets/delete.png';

export default function Tasks({ tasks, setTasks }) {
  function handleCreateTask(taskTitle) {
    if (taskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }

  function handleToggleTaskCompletion(id) {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  function handleDeleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  let content;
  if (tasks.length === 0) {
    content = (
      <div className={styles.empty}>
        <img src={emptyLogo} alt="Nenhuma tarefa" />
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    );
  } else {
    content = (
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <div className={styles.taskContent}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTaskCompletion(task.id)}
                className={styles.checkbox}
              />
              <p className={task.completed ? styles.completed : styles.taskText}>{task.title}</p>
            </div>
            <img
              src={trashIcon}
              alt="Deletar"
              className={styles.trashIcon}
              onClick={() => handleDeleteTask(task.id)}
              style={{ marginLeft: '60px' }}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          Tarefas criadas <span className={styles.count}>{createdTasksCount}</span>
        </div>
        <div>
          Concluídas{' '}
          <span className={styles.completedCount}>
            {completedTasksCount} de {createdTasksCount}
          </span>
        </div>
      </header>
      {content}
    </div>
  );
}
