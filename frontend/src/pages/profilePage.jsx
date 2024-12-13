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
  Progress,
  Center,
} from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [spentProgress, setSpentProgress] = useState(0);
  const [earnedProgress, setEarnedProgress] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUserDetails(response.data);
      } catch (error) {
        setError("Failed to fetch user details");
        console.error("Error:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails) {
      // Start with full progress and then transition to actual values
      setSpentProgress(100);
      setEarnedProgress(100);

      const timer = setTimeout(() => {
        setSpentProgress((userDetails.totalSpent / 1000) * 100); // Assuming 1000 is the max for demo
        setEarnedProgress((userDetails.totalEarned / 1000) * 100); // Assuming 1000 is the max for demo
      }, 1000); // Delay for 1 second

      return () => clearTimeout(timer);
    }
  }, [userDetails]);

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
            <Center>
              <Box position="relative" width="100px" height="100px">
                <Progress
                  value={spentProgress}
                  size="xs"
                  colorScheme="green"
                  position="absolute"
                  top={0}
                  left={0}
                  borderRadius="full"
                  transition="width 0.5s ease-in-out" // Smooth transition
                />
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  fontWeight="bold"
                >
                  ${userDetails.totalSpent}
                </Text>
              </Box>
            </Center>
            <StatHelpText>Total amount spent on bookings</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Earned</StatLabel>
            <Center>
              <Box position="relative" width="100px" height="100px">
                <Progress
                  value={earnedProgress}
                  size="xs"
                  colorScheme="blue"
                  position="absolute"
                  top={0}
                  left={0}
                  borderRadius="full"
                  transition="width 0.5s ease-in-out" // Smooth transition
                />
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  fontWeight="bold"
                >
                  ${userDetails.totalEarned}
                </Text>
              </Box>
            </Center>
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
