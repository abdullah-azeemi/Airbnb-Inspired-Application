import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const MegaAdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/admin/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/properties/${id}`);
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Mega Admin Panel</h1>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            {property.title}
            <button onClick={() => handleDelete(property._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MegaAdminPanel;
