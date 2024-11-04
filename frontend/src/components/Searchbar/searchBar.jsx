import { useState } from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  // Update the search term whenever the input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    onSearch(value); // Send updated search term to App component
  };

  // Optional: handle the search action on button click
  const handleSearch = () => {
    console.log(`Searching for location: ${location}`);
    onSearch(location); // Call onSearch to update the filter in the App
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Where are you headed?"
          value={location}
          onChange={handleInputChange} // Update the search term in real-time
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
