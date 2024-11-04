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
    <div className={styles.bookingPage}>
      <h1>Booking for Listing ID: {id}</h1>
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
      <button onClick={handleBooking} className={styles.bookButton}>
        Confirm Booking
      </button>
      {confirmation && <p>{confirmation.message}</p>}
    </div>
  );
};

export default BookingPage;
