import { createContext, useState } from "react";

export const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" // success | error
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });

    setTimeout(() => {
      setSnackbar({ open: false, message: "", type: "success" });
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
