import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BookingPage.module.css";
import axiosInstance from "../api/axiosInstance";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(0);
  const [confirmation, setConfirmation] = useState(null);
  const [listing, setListing] = useState(null);

  // Calculate price effect
  useEffect(() => {
    const calculatePrice = () => {
      if (!checkIn || !checkOut) return 0;

      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const numberOfNights = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );

      const basePrice = 100;
      const guestFee = guests > 2 ? (guests - 2) * 25 : 0;
      const totalPrice = basePrice * numberOfNights + guestFee;

      return totalPrice;
    };

    setPrice(calculatePrice());
  }, [checkIn, checkOut, guests]);

  // Fetch listing effect
  useEffect(() => {
    if (!id) {
      console.log("BookingPage - No ID found");
      navigate("/listings");
      return;
    }

    const fetchListing = async () => {
      try {
        console.log("BookingPage - Attempting to fetch listing with ID:", id);
        const response = await axiosInstance.get(`/properties/${id}`);
        console.log("BookingPage - Fetched listing:", response.data);
        setListing(response.data);
      } catch (error) {
        console.error("BookingPage - Error fetching listing:", error);
        navigate("/");
      }
    };

    fetchListing();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !guests || !price) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("Submitting booking with ID:", id);
      const response = await axiosInstance.post("/bookings", {
        listingId: id,
        checkIn,
        checkOut,
        numberOfGuests: guests,
        totalPrice: price,
      });

      console.log("Booking response:", response.data);
      setConfirmation({ message: "Booking successful!" });
      navigate(`/bookings/${response.data.booking._id}`);
    } catch (error) {
      console.error("Error booking:", error.response?.data || error.message);
      setConfirmation({ message: `Booking failed: ${error.message}` });
    }
  };

  if (!id || !listing) {
    return (
      <div className={styles.errorContainer}>
        <h1>Error: Invalid Listing</h1>
        <p>Please select a valid listing to make a booking.</p>
      </div>
    );
  }

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
        <label>
          Number of Guests:
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </label>
        <div className={styles.priceDisplay}>Total Price: ${price}</div>
        <button onClick={handleSubmit} className={styles.confirmButton}>
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
