import { Box, Flex, Link } from "@chakra-ui/react";
import NavigationLinks from "./navigationLinks.jsx";
import Logo from "./logo.jsx";
import UserMenu from "./userMenu.jsx";

const Navbar = () => {
  return (
    <Box bg="gray.800" color="white" px={4} py={2} boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Logo />
        <NavigationLinks />
        <UserMenu />
      </Flex>
    </Box>
  );
};

export default Navbar;
