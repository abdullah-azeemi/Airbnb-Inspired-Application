import { useState } from "react";
import styles from "./searchBar.module.css";
const SearchBar = () => {
  const [location, setLocation] = useState("");
  const handleSearch = () => {
    console.log(`Searching for Location ${location}`);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Where are you headed?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
