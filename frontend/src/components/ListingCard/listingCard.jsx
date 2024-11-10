import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import styles from "./listingCard.module.css";

const ListingCard = ({
  id,
  imagePath,
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
      <Link to={`/listings/${id}`} className={styles.imageLink}>
        <img
          src={`http://localhost:5000${imagePath}`}
          alt={title}
          className={styles.propertyImage}
        />
      </Link>
      <div className={styles.cardContent}>
        <Link to={`/listings/${id}`} className={styles.titleLink}>
          <h3 className={styles.propertyTitle}>{title}</h3>
        </Link>
        <p className={styles.propertyType}>{type}</p>
        <StarRating rating={rating} />
        <p>
          <strong>Guests:</strong> {guests} • <strong>Bedrooms:</strong>{" "}
          {bedrooms} • <strong>Bathrooms:</strong> {bathrooms}
        </p>
        <p className={styles.price}>${price} / night</p>
        <Link to={`/listings/${id}`} className={styles.viewDetailsButton}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
