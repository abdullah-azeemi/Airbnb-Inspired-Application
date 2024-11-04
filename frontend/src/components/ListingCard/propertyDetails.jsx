import PropTypes from "prop-types";
import styles from "./propertyDetails.module.css";
const PropertyDetails = ({
  image,
  title,
  type,
  guests,
  bedrooms,
  bathrooms,
}) => {
  return (
    <div className={styles.propertyDetails}>
      <img src={image} alt={title} className={styles.propertyImage} />
      <h3 className={styles.propertyTitle}>{title}</h3>
      <p className={styles.propertyType}>{type}</p>
      <p className={styles.propertyInfo}>
        {guests} guests . {bedrooms} bedrooms . {bathrooms} bathrooms
      </p>
    </div>
  );
};

PropertyDetails.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  guests: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
};

export default PropertyDetails;
