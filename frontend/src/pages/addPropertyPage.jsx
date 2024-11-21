import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import styles from "./addPropertyPage.module.css";

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const propertyData = new FormData();
    Object.keys(formData).forEach((key) =>
      propertyData.append(key, formData[key])
    );
    if (image) propertyData.append("image", image);

    try {
      await axiosInstance.post("/properties", propertyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add property. Please try again."
      );
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className={styles.addPropertyContainer}>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} className={styles.propertyForm}>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" onChange={handleChange} required />

        <label>Type:</label>
        <input type="text" name="type" onChange={handleChange} required />

        <label>Guests:</label>
        <input
          type="number"
          name="guests"
          min="1"
          onChange={handleChange}
          required
        />

        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          min="1"
          onChange={handleChange}
          required
        />

        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          min="1"
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          min="0"
          onChange={handleChange}
          required
        />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
