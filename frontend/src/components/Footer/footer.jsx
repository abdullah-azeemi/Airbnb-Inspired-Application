import FooterLinks from "./footerLinks";
import SocialMediaIcons from "./socialMediaIcons";
import CopyrightInfo from "./copyrightInfo";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <FooterLinks></FooterLinks>
        <SocialMediaIcons></SocialMediaIcons>
        <CopyrightInfo></CopyrightInfo>
      </div>
    </div>
  );
};
export default Footer;
