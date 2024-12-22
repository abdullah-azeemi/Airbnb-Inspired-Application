import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Image,
} from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("manageUsers");
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchListings = async () => {
      try {
        const response = await axiosInstance.get("/admin/properties");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoadingListings(false);
      }
    };

    fetchUsers();
    fetchListings();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      await axiosInstance.delete(`/admin/properties/${listingId}`);
      setListings(listings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (loadingUsers || loadingListings) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={5}>
      <Heading mb={4}>Admin Panel</Heading>
      <Tabs
        variant="enclosed"
        onChange={(index) =>
          setActiveTab(index === 0 ? "manageUsers" : "manageListings")
        }
      >
        <TabList>
          <Tab>Manage Users</Tab>
          <Tab>Manage Listings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Total Listings</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      {
                        listings.filter((listing) => listing.owner === user._id)
                          .length
                      }
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {listings.map((listing) => (
                <Card
                  key={listing._id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <CardBody>
                    <Stack spacing={3}>
                      <Heading size="md">{listing.title}</Heading>
                      <Text>{listing.description}</Text>
                      <Text fontWeight="bold">Price: ${listing.price}</Text>
                      <Text>Type: {listing.type}</Text>
                      <Text>Guests: {listing.guests}</Text>
                      <Text>Bedrooms: {listing.bedrooms}</Text>
                      <Text>Bathrooms: {listing.bathrooms}</Text>
                      <Text fontWeight="bold">
                        Listed by: {listing.userName}
                      </Text>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteListing(listing._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPanel;
