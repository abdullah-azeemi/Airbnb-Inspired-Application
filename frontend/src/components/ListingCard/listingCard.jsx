import { Link } from "react-router-dom";
import { Box, Image, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

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
}) => {
  const imageUrl = imagePath
    ? `http://localhost:5000${imagePath}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <MotionBox
      as={Link}
      to={`/properties/${id}`}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        height="200px"
        width="100%"
        objectFit="cover"
        fallback={<Box height="200px" bg="gray.100" />}
      />
      <Box p={4}>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {type} • {guests} guests • {bedrooms} bed{bedrooms !== 1 ? "s" : ""} •{" "}
          {bathrooms} bath{bathrooms !== 1 ? "s" : ""}
        </Text>
        <Text fontWeight="bold" color="teal.500">
          ${price} / night
        </Text>
      </Box>
    </MotionBox>
  );
};

ListingCard.propTypes = {
  id: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  guests: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default ListingCard;
