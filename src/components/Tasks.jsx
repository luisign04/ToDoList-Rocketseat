import React, { useState } from 'react';
import styles from './Tasks.module.css';
import emptyLogo from '../assets/emptyLogo.png';

export default function Tasks() {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState([]);
  // Estado para o título da nova tarefa
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Função para criar uma nova tarefa
  function handleCreateNewTask(e) {
    e.preventDefault();
    if (newTaskTitle.trim() === '') {
      return;
    }
    
    const newTask = {
      id: Date.now(), // Usando timestamp como ID
      title: newTaskTitle,
      completed: false,
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskTitle(''); // Limpa o input
  }

  // Função para alternar a conclusão da tarefa
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

  // Função para deletar uma tarefa
  function handleDeleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  // Contadores de tarefas
  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  // Variável para renderizar o conteúdo: lista de tarefas ou mensagem vazia
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
      {/* Formulário para criar uma nova tarefa */}
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.createButton}>
          Criar
        </button>
      </form>

      {/* Cabeçalho das tarefas */}
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

      {/* Conteúdo: lista de tarefas ou mensagem vazia */}
      {content}
    </div>
  );
}
