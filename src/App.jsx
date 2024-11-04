import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import Categories from "./components/Categories/Categories";
import ListingCard from "./components/ListingCard/ListingCard.jsx";
import Footer from "./components/Footer/Footer.jsx";
import styles from "./App.module.css";

const mockListings = [
  {
    image: "https://via.placeholder.com/300x200?text=Beachfront+House",
    title: "Beautiful Beachfront House",
    type: "Beachfront",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 150,
    rating: 4.8,
  },
  {
    image: "https://via.placeholder.com/300x200?text=Mountain+Cabin",
    title: "Cozy Mountain Cabin",
    type: "Cabin",
    guests: 6,
    bedrooms: 3,
    bathrooms: 1,
    price: 120,
    rating: 4.3,
  },
  {
    image: "https://via.placeholder.com/300x200?text=Luxury+Apartment",
    title: "Luxury City Apartment",
    type: "Apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 200,
    rating: 4.9,
  },
  {
    image: "https://via.placeholder.com/300x200?text=Tropical+Villa",
    title: "Tropical Villa with Pool",
    type: "Villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    price: 300,
    rating: 4.7,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // Add category state

  // Update search term
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Update category filter
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter listings based on search term and selected category
  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || listing.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Categories onCategorySelect={handleCategorySelect} />{" "}
      {/* Pass category handler */}
      <div className={styles.listingCardContainer}>
        {filteredListings.map((listing, index) => (
          <ListingCard key={index} {...listing} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
