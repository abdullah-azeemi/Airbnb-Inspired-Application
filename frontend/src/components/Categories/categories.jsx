import { useState } from "react";
import styles from "./categories.module.css";

const categories = [
  { name: "All" },
  { name: "House" },
  { name: "Beachfront" },
  { name: "Cabin" },
  { name: "Apartment" },
  { name: "Villa" },
  { name: "Lakefront" },
];

const Categories = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Update the active category
    onCategorySelect(category); // Call the parent handler with selected category
  };

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category) => (
        <button
          key={category.name}
          className={`${styles.categoryButton} ${
            activeCategory === category.name ? styles.active : ""
          }`}
          onClick={() => handleCategoryClick(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
