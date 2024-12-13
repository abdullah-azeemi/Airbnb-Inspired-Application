import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

const NavigationLinks = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = token ? JSON.parse(atob(token.split(".")[1])).role : null;
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <ul className={styles.navLinks}>
      <li>
        <Link to="/" className={styles.navLinks}>
          Home
        </Link>
      </li>
      {userRole === "mega-admin" && (
        <li>
          <Link to="/admin" className={styles.navLinks}>
            Admin Panel
          </Link>
        </li>
      )}
      {userRole !== "mega-admin" && (
        <>
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
        </>
      )}
    </ul>
  );
};

export default NavigationLinks;
