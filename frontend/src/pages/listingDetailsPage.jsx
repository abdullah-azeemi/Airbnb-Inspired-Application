import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import styles from "./listingDetailsPage.module.css";

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        setListing(res.data);
      } catch (err) {
        setError("Failed to load property details.");
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading property details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <img
        src={`http://localhost:5000${listing.imagePath}`}
        alt={listing.title}
        className={styles.propertyImage}
      />
      <div className={styles.detailsContent}>
        <h1 className={styles.propertyTitle}>{listing.title}</h1>
        <p>{listing.description}</p>
        <p>
          <strong>Type:</strong> {listing.type}
        </p>
        <p>
          <strong>Guests:</strong> {listing.guests} • <strong>Bedrooms:</strong>{" "}
          {listing.bedrooms} • <strong>Bathrooms:</strong> {listing.bathrooms}
        </p>
        <p className={styles.propertyPrice}>
          <strong>Price:</strong> ${listing.price} per night
        </p>
        <Link to={`/book/${id}`} className={styles.bookButton}>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
