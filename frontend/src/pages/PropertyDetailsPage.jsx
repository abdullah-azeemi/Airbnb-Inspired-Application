import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import styles from "./propertyDetails.module.css";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  console.log("PropertyDetailsPage ID:", id);

  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        setError("Failed to load property details.");
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!property) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.propertyDetailsPage}>
      <img
        src={`http://localhost:5000${property.imagePath}`}
        alt={property.title}
        className={styles.propertyImage}
      />
      <div className={styles.propertyInfo}>
        <h1>{property.title}</h1>
        <p>{property.description}</p>
        <p>
          <strong>Type:</strong> {property.type}
        </p>
        <p>
          <strong>Guests:</strong> {property.guests} •{" "}
          <strong>Bedrooms:</strong> {property.bedrooms} •{" "}
          <strong>Bathrooms:</strong> {property.bathrooms}
        </p>
        <p className={styles.price}>${property.price} / night</p>
        <Link to={`/book/${id}`} className={styles.bookButton}>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
