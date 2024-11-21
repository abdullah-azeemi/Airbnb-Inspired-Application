import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SimpleGrid, Box, Text, Spinner } from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import ListingCard from "../components/ListingCard/ListingCard";
import SearchBar from "../components/Searchbar/searchBar";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const searchQuery = searchParams.get("search");
        const response = await axiosInstance.get(
          searchQuery
            ? `/properties/search?query=${searchQuery}`
            : "/properties"
        );
        setProperties(response.data);
      } catch (error) {
        setError("Failed to load properties. Please try again.");
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="xl" />
        <Text>Loading properties...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="red.500" textAlign="center" mt={4}>
        {error}
      </Box>
    );
  }

  return (
    <>
      <SearchBar />
      <Box p={4}>
        {properties.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {properties.map((property) => (
              <ListingCard key={property._id} id={property._id} {...property} />
            ))}
          </SimpleGrid>
        ) : (
          <Text textAlign="center" mt={4}>
            No properties available.
          </Text>
        )}
      </Box>
    </>
  );
};

export default HomePage;
