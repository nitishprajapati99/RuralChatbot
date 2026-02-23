import { useContext } from "react";
import { SnackbarContext } from "../Context/SnackbarContext";

const Snackbar = () => {
  const { snackbar } = useContext(SnackbarContext);

  if (!snackbar.open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 20px",
        background: snackbar.type === "error" ? "#ff4d4f" : "#28a745",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
        zIndex: 2000
      }}
    >
      {snackbar.message}
    </div>
  );
};

export default Snackbar;
