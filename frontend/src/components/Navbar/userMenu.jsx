import { Link } from "react-router-dom";
import styles from "./userMenu.module.css";
const UserMenu = () => {
  return (
    <div className={styles.userMenu}>
      <ul>
        <li>
          <Link to="/" className={styles.userMenu}>
            Login
          </Link>
        </li>
        <li>
          <Link to="\" className={styles.userMenu}>
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default UserMenu;
