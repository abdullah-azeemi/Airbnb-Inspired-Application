import styles from "./navbar.module.css";

const NavigationLinks = () => {
  return (
    <ul className={styles.navLinks}>
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Experiences</a>
      </li>
      <li>
        <a href="#">Online Experiences</a>
      </li>
    </ul>
  );
};

export default NavigationLinks;
