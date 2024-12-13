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
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
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
            {loadingUsers ? (
              <Text>Loading users...</Text>
            ) : (
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
                      <Td>{user.listings ? user.listings.length : 0}</Td>
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
            )}
          </TabPanel>
          <TabPanel>
            {loadingListings ? (
              <Text>Loading listings...</Text>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                {listings.map((listing) => (
                  <Card
                    key={listing._id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                  >
                    <Image src={listing.imageUrl} alt={listing.title} />
                    <CardBody>
                      <Stack spacing={3}>
                        <Heading size="md">{listing.title}</Heading>
                        <Text>{listing.description}</Text>
                        <Text fontWeight="bold">${listing.price}</Text>
                        <Badge
                          colorScheme={
                            listing.status === "available" ? "green" : "red"
                          }
                        >
                          {listing.status}
                        </Badge>
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
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPanel;
