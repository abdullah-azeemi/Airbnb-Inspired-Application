import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ListingCard from "../components/ListingCard/ListingCard";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        setProperties(response.data);
      } catch (error) {
        setError("Failed to load properties. Please try again.");
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.listingCardContainer}>
      {properties.length > 0 ? (
        properties.map((property) => (
          <ListingCard key={property._id} id={property._id} {...property} />
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

export default HomePage;
