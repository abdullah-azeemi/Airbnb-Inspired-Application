import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import styles from "./UserBookingsPage.module.css";

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

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (bookings.length === 0) {
    return <div className={styles.noBookings}>No bookings found.</div>;
  }

  return (
    <div className={styles.bookingsPage}>
      <h1>Your Bookings</h1>
      <div className={styles.bookingsList}>
        {bookings.map((booking) => (
          <div key={booking._id} className={styles.bookingCard}>
            <img
              src={`http://localhost:5000${booking.propertyId.imagePath}`}
              alt={booking.propertyId.title}
              className={styles.bookingImage}
            />
            <div className={styles.bookingDetails}>
              <h2>{booking.propertyId.title}</h2>
              <p>
                <strong>Check-in:</strong>{" "}
                {new Date(booking.checkInDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Cost:</strong> ${booking.totalCost}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookingsPage;
