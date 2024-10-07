import NavigationLinks from "./navigationLinks.jsx";
import Logo from "./logo.jsx";
import UserMenu from "./userMenu.jsx";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Logo></Logo>
      <NavigationLinks></NavigationLinks>
      <UserMenu></UserMenu>
    </div>
  );
};
export default Navbar;
