import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Badge,
} from "@chakra-ui/react";
import StarRating from "../components/ListingCard/starRating";

const statusStyles = {
  pending: { colorScheme: "yellow" },
  confirmed: { colorScheme: "green" },
  cancelled: { colorScheme: "red" },
};

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings");
        setBookings(response.data);
      } catch (error) {
        setError("Failed to fetch bookings. Please try again.");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: "canceled" } : booking
        )
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Failed to cancel booking. Please try again.");
    }
  };

  if (error) {
    return (
      <Text color="red.500" textAlign="center" mt={4}>
        {error}
      </Text>
    );
  }

  if (bookings.length === 0) {
    return (
      <Text textAlign="center" mt={4} color="gray.600">
        No bookings found.
      </Text>
    );
  }

  return (
    <Box p={5} bg="gray.50" minH="100vh">
      <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.600">
        Your Bookings
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {bookings
          .slice()
          .reverse()
          .map((booking) => {
            return (
              <Card key={booking._id} variant="outline">
                <CardBody>
                  <Stack spacing={3}>
                    <Text fontWeight="bold" fontSize="lg">
                      {booking.listingId
                        ? booking.listingId.title
                        : "Listing not found"}
                    </Text>
                    <StarRating rating={4.5} />
                    <Badge
                      colorScheme={statusStyles[booking.status]?.colorScheme}
                      borderRadius="md"
                      px={2}
                      py={1}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                    <Text>
                      Check-in: {new Date(booking.checkIn).toLocaleDateString()}{" "}
                      - Check-out:{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </Text>
                    <Text>Total Price: ${booking.totalPrice}</Text>
                    <Text>Status: {booking.status}</Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Cancel Booking
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default UserBookingsPage;
