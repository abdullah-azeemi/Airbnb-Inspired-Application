import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import styles from "./UserBookingsPage.module.css";
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
} from "@chakra-ui/react";

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
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (bookings.length === 0) {
    return <Text>No bookings found.</Text>;
  }

  return (
    <Box className="p-5 bg-gray-50 min-h-screen">
      <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.600">
        Your Bookings
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {bookings.map((booking) => (
          <Card key={booking._id} variant="outline">
            <CardBody>
              <Stack spacing="3">
                <Text fontWeight="bold">
                  {booking.listingId
                    ? booking.listingId.title
                    : "Listing not found"}
                </Text>
                <Text>
                  Check-in: {new Date(booking.checkIn).toLocaleDateString()} -
                  Check-out: {new Date(booking.checkOut).toLocaleDateString()}
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
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserBookingsPage;
