# Airbnb Clone - React Project

## Project Description

This project is a simple **Airbnb clone** built with **React** that replicates some of the core features of the Airbnb homepage. The main objective is to create a responsive and interactive user interface using functional components, React hooks, and modular CSS for styling.

The application includes:

- A responsive **Navbar** with a logo, navigation links, and user menu.
- A **SearchBar** for users to input location.
- A **Categories** section with scrollable category buttons to filter listings.
- **ListingCards** to display property information (title, type, guests, price, rating, etc.).
- A responsive **Footer** containing useful links, social media icons, and copyright information.

## Features

- **React Functional Components**: Each section is built using functional components and organized into subcomponents for better code readability and scalability.
- **Responsive Design**: The application is fully responsive, providing a smooth experience across different screen sizes.
- **State Management**: React's `useState` and `useEffect` hooks are used for managing state and handling side effects.
- **CSS Modules**: Modular CSS for scoped styling, ensuring no conflicts between different components.
- **React Icons**: Used for adding social media icons in the footer.

## Setup Instructions

To run this project locally, follow these steps:

### Prerequisites

- Make sure you have **Node.js** installed. You can download it from [Node.js official website](https://nodejs.org/).
- **npm** (comes with Node.js) or **yarn** as the package manager.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/airbnb-clone.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd airbnb-clone
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

   This will start the project on `http://localhost:3000/` where you can view the application in your browser.

### Build

To create an optimized production build:

```bash
npm run build
```

This will output the production files in the `build` folder, ready to be deployed.

## Project Structure

```
src/
|-- components/
|   |-- Navbar/
|       |-- Logo.jsx
|       |-- NavigationLinks.jsx
|       |-- UserMenu.jsx
|       |-- Navbar.module.css
|   |-- SearchBar/
|       |-- SearchBar.jsx
|       |-- SearchBar.module.css
|   |-- Categories/
|       |-- Categories.jsx
|       |-- Categories.module.css
|   |-- ListingCard/
|       |-- PropertyDetails.jsx
|       |-- PricingAndRating.jsx
|       |-- ListingCard.jsx
|       |-- ListingCard.module.css
|   |-- Footer/
|       |-- FooterLinks.jsx
|       |-- SocialMediaIcons.jsx
|       |-- CopyrightInfo.jsx
|       |-- Footer.jsx
|       |-- Footer.module.css
|-- App.jsx
|-- App.module.css
```

### Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React Icons**: For including social media icons in the footer.
- **CSS Modules**: For scoped and modular styling.

## License

This project is open-source under the **MIT License**. You are free to use, modify, and distribute the code.
