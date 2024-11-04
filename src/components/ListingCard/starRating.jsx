import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./starRating.module.css";

const StarRating = ({ rating, ...props }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => {
        const filled = index + 1 <= Math.round(rating);
        return (
          <FaStar
            key={index}
            className={filled ? styles.filledStar : styles.emptyStar}
            {...props}
          />
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
