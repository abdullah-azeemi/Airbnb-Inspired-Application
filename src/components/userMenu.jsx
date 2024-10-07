import styles from "./userMenu.module.css";
const UserMenu = () => {
  return (
    <div className={styles.userMenu}>
      <ul>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Signup</a>
        </li>
      </ul>
    </div>
  );
};
export default UserMenu;
