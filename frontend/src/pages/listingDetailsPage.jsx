import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/ListingCard/starRating";
import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/listings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch listing details.");
        const data = await res.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
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
  console.log("ListingDetailsPage - Listing ID:", id);

  return (
    <div className={styles.detailsContainer}>
      <img
        src={`http://localhost:5000${listing.imagePath}`}
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

        {}
        <div className={styles.amenities}>
          <h2>Amenities</h2>
          <ul>
            <li>Free Wi-Fi</li>
            <li>Air Conditioning</li>
            <li>Swimming Pool</li>
            <li>Parking</li>
          </ul>
        </div>

        <Link to={`/book/${id}`} className={styles.bookButton}>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
