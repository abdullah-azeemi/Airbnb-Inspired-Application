import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useToast,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const AddPropertyPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const toast = useToast();
  const navigate = useNavigate();

  const propertyTypes = [
    "House",
    "Beachfront",
    "Cabin",
    "Apartment",
    "Villa",
    "Lakefront",
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Basic validation
      if (
        !title ||
        !description ||
        !propertyType ||
        !price ||
        !guests ||
        !bedrooms ||
        !bathrooms
      ) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", propertyType);
      formData.append("price", price.toString());
      formData.append("guests", guests.toString());
      formData.append("bedrooms", bedrooms.toString());
      formData.append("bathrooms", bathrooms.toString());

      if (image) {
        formData.append("image", image);
      }

      // Debug log
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axiosInstance.post("/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Property created:", response.data);
      toast({
        title: "Success",
        description: "Property added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating property:", error.response?.data || error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add property",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <MotionBox
      p={5}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      maxW="lg"
      mx="auto"
      mt={10}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Heading as="h2" mb={4} textAlign="center">
        Add New Property
      </Heading>
      <form onSubmit={handleAddProperty}>
        <FormControl isRequired mb={4}>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Property Type</FormLabel>
          <Select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            placeholder="Select Property Type"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Guests</FormLabel>
          <Input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min={1}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Bedrooms</FormLabel>
          <Input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            min={1}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Bathrooms</FormLabel>
          <Input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            min={1}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full">
          Add Property
        </Button>
      </form>
    </MotionBox>
  );
};

export default AddPropertyPage;
