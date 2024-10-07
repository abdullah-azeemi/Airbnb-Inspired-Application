import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import styles from "./socialMediaIcons.module.css";

const SocialMediaIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <a href="https://facebook.com">
        <FaFacebook size={24} />
      </a>
      <a href="https://twitter.com">
        <FaTwitter size={24} />
      </a>
      <a href="https://instagram.com">
        <FaInstagram size={24} />
      </a>
    </div>
  );
};
export default SocialMediaIcons;
