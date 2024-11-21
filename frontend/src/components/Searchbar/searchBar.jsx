import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box w="100%" bg="white" py={4} px={4} shadow="sm">
      <form onSubmit={handleSearch}>
        <InputGroup maxW="600px" mx="auto">
          <Input
            placeholder="Search for properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            bg="white"
            borderColor="gray.300"
            _focus={{ borderColor: "teal.500" }}
            transition="border-color 0.2s"
          />
          <InputRightElement h="100%">
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              onClick={handleSearch}
              size="lg"
              colorScheme="teal"
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBar;
