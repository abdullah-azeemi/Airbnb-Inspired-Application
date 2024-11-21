import { Link, useNavigate } from "react-router-dom";
import styles from "./userMenu.module.css";
const UserMenu = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className={styles.userMenu}>
      {isLoggedIn ? (
        <>
          <ul>
            <li>
              <Link to="/bookings">My Bookings</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li>
              <Link to="/login" className={styles.userMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className={styles.userMenu}>
                Signup
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
export default UserMenu;
