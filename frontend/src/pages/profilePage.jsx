import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUserDetails(response.data);
      } catch (err) {
        setError("Failed to load user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axiosInstance.delete(`/properties/${propertyId}`);
      fetchUserProfile();
      toast({
        title: "Success",
        description: "Property deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        {error}
      </Text>
    );
  }

  if (!userDetails) {
    return <Text>Loading...</Text>;
  }

  const maxSpent = 10000; // Adjust this value as needed
  const spentProgress = (userDetails.totalSpent / maxSpent) * 100;

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Heading as="h1" mb={5}>
        User Profile
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="lg" mb={4}>
            User Information
          </Heading>
          <Text>
            <strong>Name:</strong> {userDetails.name}
          </Text>
          <Text>
            <strong>Email:</strong> {userDetails.email}
          </Text>
          <Text>
            <strong>Total Bookings:</strong>{" "}
            {userDetails.totalBookingsLastMonth}
          </Text>
          <Text>
            <strong>Total Spent:</strong> ${userDetails.totalSpent}
          </Text>
          <Text>
            <strong>Total Listings:</strong>{" "}
            {userDetails.totalListingsLastMonth}
          </Text>
          <br />
          <Box height="200px" width="200px">
            <CircularProgressbar
              value={spentProgress}
              text={`${spentProgress.toFixed(2)}%`}
              styles={{
                path: {
                  stroke: `rgba(62, 152, 199, ${spentProgress / 100})`,
                },
                text: {
                  fill: "#f88",
                  fontSize: "16px",
                },
              }}
            />
          </Box>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="lg" mb={4}>
            My Listings
          </Heading>
          {userDetails.listings && userDetails.listings.length > 0 ? (
            <SimpleGrid columns={1} spacing={3}>
              {userDetails.listings.map((listing) => (
                <Box
                  key={listing._id}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Text fontWeight="bold">{listing.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      ${listing.price}/night
                    </Text>
                  </Box>
                  <Box>
                    <Link to={`/properties/${listing._id}`}>
                      <Button size="sm" colorScheme="blue" mr={2}>
                        View
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteProperty(listing._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No listings found.</Text>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
