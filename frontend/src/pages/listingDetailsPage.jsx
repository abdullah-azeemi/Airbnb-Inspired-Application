import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/ListingCard/starRating";
import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch((error) => console.error("Error fetching listing:", error));
  }, [id]);

  return listing ? (
    <div className={styles.detailsContainer}>
      <img
        src={listing.image}
        alt={listing.title}
        className={styles.propertyImage}
      />
      <div className={styles.detailsContent}>
        <h1 className={styles.propertyTitle}>{listing.title}</h1>
        <StarRating rating={listing.rating} />
        <p className={styles.propertyType}>
          <strong>Type:</strong> {listing.type}
        </p>
        <p>
          <strong>Guests:</strong> {listing.guests}
        </p>
        <p>
          <strong>Bedrooms:</strong> {listing.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {listing.bathrooms}
        </p>
        <p className={styles.propertyPrice}>
          <strong>Price:</strong> ${listing.price} per night
        </p>
        <Link to={`/book/${id}`} className={styles.bookButton}>
          Book Now
        </Link>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ListingDetailsPage;
