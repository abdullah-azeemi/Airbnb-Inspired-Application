import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      toast({
        title: "Registration successful.",
        description: "You can now log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Role</FormLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="mega-admin">Mega Admin</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignupPage;
