import { Link } from "react-router-dom";
import { Box, Image, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ListingCard = ({
  id,
  imagePath,
  title,
  type,
  guests,
  bedrooms,
  bathrooms,
  price,
  rating,
}) => {
  return (
    <MotionBox
      as={Link}
      to={`/properties/${id}`}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      p={4}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={`http://localhost:5000${imagePath}`}
        alt={title}
        borderRadius="md"
        mb={4}
        objectFit="cover"
        h="200px"
        w="100%"
      />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {type} • Guests: {guests} • Bedrooms: {bedrooms} • Bathrooms:{" "}
        {bathrooms}
      </Text>
      <Text fontWeight="bold" color="teal.500" mb={2}>
        ${price} / night
      </Text>
    </MotionBox>
  );
};

export default ListingCard;
