import React from 'react';
import styles from './Tasks.module.css';
import emptyLogo from '../assets/emptyLogo.png';

export default function Tasks({tasks, setTasks}) {

  // Função que cria a tarefa, chamada pelo componente Create
  function handleCreateTask(taskTitle) {
    if (taskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }

  // Alterna a conclusão da tarefa
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

  // Deleta uma tarefa
  function handleDeleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  // Contadores
  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  // Exibição condicional (sem operador ternário)
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
        {tasks.map(task => {
          let taskClassName = '';
          if (task.completed) {
            taskClassName = styles.completed;
          }
          return (
            <li key={task.id} className={styles.taskItem}>
              <div className={styles.taskContent}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTaskCompletion(task.id)}
                  className={styles.checkbox}
                />
                <p className={taskClassName}>{task.title}</p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteTask(task.id)}
              >
                Deletar
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      
  

      {/* Cabeçalho: contadores */}
      <header className={styles.header}>
        <div>
          Tarefas criadas <span className={styles.count}>{createdTasksCount}</span>
        </div>
        <div>
          Concluídas{' '}
          <span className={styles.count}>
            {completedTasksCount} de {createdTasksCount}
          </span>
        </div>
      </header>

      {/* Lista de tarefas ou estado vazio */}
      {content}
    </div>
  );
}
