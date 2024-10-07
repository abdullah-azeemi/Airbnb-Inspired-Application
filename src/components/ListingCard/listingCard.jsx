import PropTypes from "prop-types";
import PropertyDetails from "./propertyDetails.jsx";
import PricingAndRating from "./pricingAndRating.jsx";
import styles from "./listingCard.module.css";

const ListingCard = ({
  image,
  title,
  type,
  guests,
  bedrooms,
  bathrooms,
  price,
  rating,
}) => {
  return (
    <div className={styles.listingCard}>
      <PropertyDetails
        image={image}
        title={title}
        type={type}
        guests={guests}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
      />
      <PricingAndRating price={price} rating={rating} />
    </div>
  );
};

// Add prop types for validation
ListingCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  guests: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ListingCard;
