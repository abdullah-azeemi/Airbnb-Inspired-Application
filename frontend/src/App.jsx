import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import AdminPanel from "./pages/adminPanel";
import MegaAdminPanel from "./pages/megaAdminPanel";
import PrivateRoute from "./components/PrivateRoute/privateRoute";
import AddPropertyPage from "./pages/AddPropertyPage";
import UserBookingsPage from "./pages/userBookingsPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import BookingPage from "./pages/bookingPage";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/properties/:id"
            element={
              <PrivateRoute>
                <PropertyDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route path="/bookings" element={<UserBookingsPage />} />
          <Route path="/listings" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/mega"
            element={
              <PrivateRoute>
                <MegaAdminPanel />
              </PrivateRoute>
            }
          />
          <Route path="/admin/add-property" element={<AddPropertyPage />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
