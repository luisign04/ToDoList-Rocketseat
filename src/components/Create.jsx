import styles from './Create.module.css';
import React, { useState } from 'react';


export default function Create({onCreateTask}) {

    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(inputValue.trim() === ''){
            return;
        }
        onCreateTask(inputValue);
        setInputValue('');
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                className={styles.create} 
                placeholder="Adicione uma nova tarefa" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className={styles.button} type='submit'>
                Criar 
            </button>
            </form>
        </div>
    )
}