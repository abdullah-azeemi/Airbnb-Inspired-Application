import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./starRating.jsx";
import styles from "./listingCard.module.css";

const ListingCard = ({
  id,
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
      <Link to={`/listings/${id}`} className={styles.link}>
        <img
          src={`http://localhost:5000${image}`}
          alt={title}
          className={styles.propertyImage}
        />
        <h3 className={styles.propertyTitle}>{title}</h3>
      </Link>
      <p className={styles.propertyType}>Type: {type}</p>
      <p>Guests: {guests}</p>
      <p>Bedrooms: {bedrooms}</p>
      <p>Bathrooms: {bathrooms}</p>
      <p>Price: ${price} per night</p>
      <p>
        Rating:
        <StarRating rating={rating} />
      </p>
    </div>
  );
};

export default ListingCard;
