import Navbar from "./components/Navbar/navbar.jsx";
import SearchBar from "./components/Searchbar/searchBar.jsx";
import Categories from "./components/Categories/categories.jsx";
import ListingCard from "./components/Listingcard/listingCard.jsx";
import Footer from "./components/Footer/footer.jsx";
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
      <Footer></Footer>
    </div>
  );
}

export default App;
