import { Spinner, Box } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Spinner size="xl" />
      <Text>Loading...</Text>
    </Box>
  );
};

export default LoadingSpinner;
