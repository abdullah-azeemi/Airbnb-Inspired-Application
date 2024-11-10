import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ListingCard from "../components/ListingCard/listingCard";
import styles from "./homePage.module.css";

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className={styles.listingCardContainer}>
      {properties.map((property) => (
        <ListingCard key={property._id} {...property} />
      ))}
    </div>
  );
};

export default HomePage;
