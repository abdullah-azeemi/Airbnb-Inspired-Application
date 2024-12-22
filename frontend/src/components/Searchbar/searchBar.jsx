import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch(""); // This will fetch all properties
    navigate("/"); // Remove search params from URL
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
            {searchQuery ? (
              <IconButton
                aria-label="Clear search"
                icon={<CloseIcon />}
                onClick={handleClear}
                size="sm"
                variant="ghost"
                mr={8} // Add margin to separate from search button
              />
            ) : null}
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
