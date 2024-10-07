import styles from "./footerLinks.module.css";
const FooterLinks = () => {
  return (
    <div className={styles.footerLinks}>
      <ul>
        <li>
          <a href="#">Support</a>
        </li>
        <li>
          <a href="#">Community</a>
        </li>
        <li>
          <a href="#">Hosting</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </div>
  );
};
export default FooterLinks;
