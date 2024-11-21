import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data);
      } catch (error) {
        setError("Failed to fetch user details");
        console.error("Error:", error);
      }
    };

    fetchUserDetails();
  }, []);

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

  return (
    <Box maxW="1200px" mx="auto" p={5}>
      <Heading as="h1" mb={5}>
        User Profile
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="lg" mb={4}>
            User Statistics
          </Heading>
          <Stat>
            <StatLabel>Total Bookings Last Month</StatLabel>
            <StatNumber>{userDetails.totalBookingsLastMonth}</StatNumber>
            <StatHelpText>Bookings made in the last month</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Listings Last Month</StatLabel>
            <StatNumber>{userDetails.totalListingsLastMonth}</StatNumber>
            <StatHelpText>Listings created in the last month</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Spent</StatLabel>
            <StatNumber>${userDetails.totalSpent}</StatNumber>
            <StatHelpText>Total amount spent on bookings</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Earned</StatLabel>
            <StatNumber>${userDetails.totalEarned}</StatNumber>
            <StatHelpText>Total amount earned from listings</StatHelpText>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading as="h3" size="lg" mb={4}>
            My Listings
          </Heading>
          {userDetails.listings.length > 0 ? (
            userDetails.listings.map((listing) => (
              <Box
                key={listing._id}
                mb={3}
                p={3}
                borderWidth="1px"
                borderRadius="md"
              >
                <Text fontWeight="bold">{listing.title}</Text>
                <Text>Price: ${listing.price} per night</Text>
                <Link to={`/properties/${listing._id}`}>
                  <Button mt={2} colorScheme="blue">
                    View Listing
                  </Button>
                </Link>
              </Box>
            ))
          ) : (
            <Text>No listings found.</Text>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
