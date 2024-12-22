import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import styles from "./propertyDetails.module.css";
import StarRating from "../components/ListingCard/starRating";

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
    return <Text color="red.500">{error}</Text>;
  }

  if (!property) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box className={styles.propertyDetailsPage} p={5}>
      <Image
        src={`http://localhost:5000${property.imagePath}`}
        alt={property.title}
        className={styles.propertyImage}
        borderRadius="md"
      />
      <Box className={styles.propertyInfo} mt={4}>
        <Heading as="h1" size="lg">
          {property.title}
        </Heading>
        <StarRating rating={4.5} />
        <Text>{property.description}</Text>
        <Text>
          <strong>Type:</strong> {property.type}
        </Text>
        <Text>
          <strong>Guests:</strong> {property.guests} •{" "}
          <strong>Bedrooms:</strong> {property.bedrooms} •{" "}
          <strong>Bathrooms:</strong> {property.bathrooms}
        </Text>
        <Text className={styles.price}>${property.price} / night</Text>
        <Link to={`/book/${id}`}>
          <Button colorScheme="teal" mt={4}>
            Book Now
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PropertyDetailsPage;
