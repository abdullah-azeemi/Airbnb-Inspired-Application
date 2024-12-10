import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SimpleGrid, Box, Text, Spinner, Button, Icon } from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import ListingCard from "../components/ListingCard/listingCard";
import SearchBar from "../components/Searchbar/searchBar";
import { AddIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const searchQuery = searchParams.get("search");
        const response = await axiosInstance.get(
          searchQuery
            ? `/properties/search?query=${searchQuery}`
            : "/properties"
        );
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        setError("Failed to load properties. Please try again.");
        console.error(
          "Error fetching properties:",
          error.response ? error.response.data : error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  const handleAddProperty = () => {
    navigate("/admin/add-property");
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="xl" />
        <Text>Loading properties...</Text>
      </Box>
    );
  }

  if (error) {
    if (error.response && error.response.status === 401) {
      // Token expired, redirect to login
      navigate("/login");
    } else {
      return (
        <Box color="red.500" textAlign="center" mt={4}>
          {error}
        </Box>
      );
    }
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
      <Button
        onClick={handleAddProperty}
        position="fixed"
        bottom="20px"
        right="20px"
        colorScheme="teal"
        borderRadius="full"
        size="lg"
        boxShadow="lg"
      >
        <Icon as={AddIcon} w={6} h={6} />
      </Button>
    </>
  );
};

export default HomePage;
