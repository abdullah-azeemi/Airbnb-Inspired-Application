import Navbar from "./components/navbar.jsx";
import SearchBar from "./components/searchBar.jsx";
import Categories from "./components/categories.jsx";
import ListingCard from "./components/Listingcard/listingCard.jsx";
import styles from "./App.module.css";

function App() {
  const mockListing = {
    image: "https://via.placeholder.com/300x200",
    title: "Beautiful Beachfront House",
    type: "Entire Home",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 150,
    rating: 4.8,
  };

  return (
    <div>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Categories></Categories>
      <div className={styles.listingCardContainer}>
        <ListingCard {...mockListing}></ListingCard>
        <ListingCard {...mockListing}></ListingCard>
        <ListingCard {...mockListing}></ListingCard>
        <ListingCard {...mockListing}></ListingCard>
      </div>
    </div>
  );
}

export default App;
