import { useState } from "react";
import styles from "./categories.module.css";

const categories = [
  { name: "Beachfront" },
  { name: "Cabins" },
  { name: "Trending" },
  { name: "Luxury" },
  { name: "Camping" },
  { name: "Historical" },
  { name: "Tropical" },
  { name: "Mountains" },
];

const Categories = () => {
  const [activeCategory, setCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setCategory(category);
    console.log(`Active Category is : ${category}`);
  };

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categories}>
        <button
          className={`${styles.categoryButton} ${
            activeCategory === "All" ? styles.active : ""
          }`}
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`${styles.categoryButton} ${
              activeCategory === category.name ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
