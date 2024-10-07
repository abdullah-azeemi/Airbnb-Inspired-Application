import PropTypes from "prop-types";
import styles from "./pricingAndRating.module.css";

const PricingAndRating = ({ price, rating }) => {
  return (
    <div className={styles.pricingRating}>
      <p className={styles.propertyPrice}>${price} / night</p>
      <p className={styles.propertyRating}>⭐ {rating}</p>
    </div>
  );
};

PricingAndRating.propTypes = {
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
export default PricingAndRating;
