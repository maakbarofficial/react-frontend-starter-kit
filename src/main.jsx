import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@/theme/ThemeContext.jsx";
import { Bounce, ToastContainer } from 'react-toastify';
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastStyle={{ fontFamily: 'Fira Sans', fontWeight: 'normal', color: 'black', fontSize: '15px' }}
      />
    </ThemeProvider>
  </StrictMode>
);
