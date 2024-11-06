import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const handleBooking = () => {
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId: id, checkIn, checkOut }),
    })
      .then((res) => res.json())
      .then((data) => setConfirmation(data))
      .catch((error) => console.error("Error booking:", error));
  };

  return (
    <div className={styles.bookingContainer}>
      <h1 className={styles.pageTitle}>Complete Your Booking</h1>
      <div className={styles.bookingForm}>
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
        <button onClick={handleBooking} className={styles.confirmButton}>
          Confirm Booking
        </button>
      </div>
      {confirmation && (
        <div className={styles.confirmationMessage}>{confirmation.message}</div>
      )}
    </div>
  );
};

export default BookingPage;
