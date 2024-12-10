import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      // Handle successful signup (e.g., redirect or show success message)
    } catch (error) {
      console.error("Signup error:", error); // Log the full error
      console.error("Error response data:", error.response?.data); // Log the error response data
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSignup}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button mt={4} colorScheme="teal" type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignupPage;
