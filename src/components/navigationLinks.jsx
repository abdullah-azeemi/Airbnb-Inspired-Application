import styles from "./navigationLinks.module.css";
const NavigationLinks = () => {
  return (
    <div className={styles.navMain}>
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
    </div>
  );
};
export default NavigationLinks;
