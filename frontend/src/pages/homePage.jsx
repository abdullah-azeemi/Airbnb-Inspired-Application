import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Button,
  Icon,
  Container,
  Input,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axiosInstance from "../api/axiosInstance";
import ListingCard from "../components/ListingCard/listingCard";
import Categories from "../components/Categories/categories";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const searchQuery = searchParams.get("search");
      const response = await axiosInstance.get(
        searchQuery ? `/properties/search?query=${searchQuery}` : "/properties"
      );
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      setError("Failed to load properties. Please try again.");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const handleCategorySelect = (category) => {
    if (category === "All") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(
        (property) => property.type === category
      );
      setFilteredProperties(filtered);
    }
  };

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
    return (
      <Box color="red.500" textAlign="center" mt={4}>
        {error}
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={4}>
      <VStack spacing={3}>
        <Input
          placeholder="Search properties..."
          value={searchQuery}
          onChange={handleSearch}
          size="lg"
          maxW="600px"
        />
        <Categories onCategorySelect={handleCategorySelect} />
        <Box w="100%">
          {filteredProperties.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {filteredProperties.map((property) => (
                <ListingCard
                  key={property._id}
                  id={property._id}
                  imagePath={property.imagePath}
                  title={property.title}
                  type={property.type}
                  guests={property.guests}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  price={property.price}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" mt={4}>
              No properties available.
            </Text>
          )}
        </Box>
      </VStack>

      {/* Add Property Button */}
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
    </Container>
  );
};

export default HomePage;
