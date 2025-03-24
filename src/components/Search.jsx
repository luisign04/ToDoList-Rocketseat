import styles from './Search.module.css';
export default function Search() {
    return (
        <div className={styles.searchContainer}>
            <input 
                type="text" 
                className={styles.searchBar} 
                placeholder="Adicione uma nova tarefa" 
            />
            <button 
                className={styles.button}>
                Criar 
                </button>
        </div>
    )
}