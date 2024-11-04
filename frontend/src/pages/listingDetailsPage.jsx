import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StarRating from "../components/ListingCard/starRating";
import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch((error) => console.error("Error fetching listing:", error));
  }, [id]);
  console.log(listing);

  return listing ? (
    <div className={styles.detailsPage}>
      <img
        src={listing.image}
        alt={listing.title}
        className={styles.propertyImage}
      />
      <h1>{listing.title}</h1>
      <p>Type: {listing.type}</p>
      <p>Guests: {listing.guests}</p>
      <p>Bedrooms: {listing.bedrooms}</p>
      <p>Bathrooms: {listing.bathrooms}</p>
      <p>Price: ${listing.price} per night</p>
      <p>
        Rating: <StarRating rating={listing.rating} />
      </p>
      <Link to={`/book/${id}`} className={styles.bookButton}>
        Book Now
      </Link>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ListingDetailsPage;
