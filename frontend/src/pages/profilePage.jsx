import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const response = await axiosInstance.get("/properties/my-listings");
      setListings(response.data);
    } catch (error) {
      setError("Failed to fetch listings");
      console.error("Error:", error);
    }
  };

  const handleDeleteListing = async (propertyId) => {
    try {
      await axiosInstance.delete(`/properties/${propertyId}`);
      fetchUserListings();
    } catch (error) {
      setError("Failed to delete listing");
      console.error("Error:", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>

      <div className="listings-section">
        <div className="listings-header">
          <h2>My Listings</h2>
          <Link to="/admin/add-property" className="add-listing-btn">
            Add New Listing
          </Link>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <img
                src={`http://localhost:5000${listing.imagePath}`}
                alt={listing.title}
              />
              <div className="listing-details">
                <h3>{listing.title}</h3>
                <p>Price: ${listing.price}/night</p>
                <div className="listing-actions">
                  <Link
                    to={`/edit-property/${listing._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
