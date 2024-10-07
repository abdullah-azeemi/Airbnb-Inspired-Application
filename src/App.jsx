import Navbar from "./components/navbar.jsx";
import SearchBar from "./components/searchBar.jsx";
import Categories from "./components/categories.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Categories></Categories>
    </div>
  );
}

export default App;
