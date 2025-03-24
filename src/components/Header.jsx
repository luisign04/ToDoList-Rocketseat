import styles from './Header.module.css';
import logo from '../assets/logo.png';

export default function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="logo-todo" className={styles.img} />
        </header>
    )

}