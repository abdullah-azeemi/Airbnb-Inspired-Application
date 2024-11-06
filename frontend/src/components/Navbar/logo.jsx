import { Link } from "react-router-dom";
import styles from "./logo.module.css";
const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="\">
        <img src="src\images\airbnb-logo.png" alt="Airbnb Logo" />
      </Link>
    </div>
  );
};
export default Logo;
