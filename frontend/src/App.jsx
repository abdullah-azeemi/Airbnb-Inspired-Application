import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import Categories from "./components/Categories/Categories";
import ListingCard from "./components/ListingCard/ListingCard.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ListingDetailsPage from "./pages/listingDetailsPage";
import BookingPage from "./pages/bookingPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignupPage from "./pages/signupPage.jsx";
import styles from "./App.module.css";

function App() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch listings from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Check if data is logged
        setListings(data);
      })
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  console.log(listings);

  const handleSearch = (term) => setSearchTerm(term);
  const handleCategorySelect = (category) => setSelectedCategory(category);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || listing.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              <Categories onCategorySelect={handleCategorySelect} />
              <div className={styles.listingCardContainer}>
                {filteredListings.map((listing, index) => (
                  <ListingCard key={index} {...listing} />
                ))}
              </div>
            </>
          }
        />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
