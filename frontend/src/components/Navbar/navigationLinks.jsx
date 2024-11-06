import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const NavigationLinks = () => {
  return (
    <ul className={styles.navLinks}>
      <li>
        <Link to="\" className={styles.navLinks}>
          Home
        </Link>
      </li>
      <li>
        <Link to="\" className={styles.navLinks}>
          Experiences
        </Link>
      </li>
      <li>
        <Link to="\" className={styles.navLinks}>
          Online Experiences
        </Link>
      </li>
    </ul>
  );
};

export default NavigationLinks;
