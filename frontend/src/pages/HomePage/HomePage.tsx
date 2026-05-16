import { useNavigate } from "react-router-dom";

import styles from "./HomePage.module.css";
import { Button } from "../../shared/ui/Button";

import { useAuthStore } from "../../store/authStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className={styles.navBar}>
      {isAuthenticated && user ? (
        <>
          <span className={styles.userName}>Welcome, {user.name}!</span>
          <div className={styles.buttonGroup}>
            <Button color="success" onClick={handleDashboard}>
              Dashboard
            </Button>
            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button color="primary" to="/signup">
            Signup
          </Button>
          <Button color="success" to="/signin">
            Signin
          </Button>
        </>
      )}
    </nav>
  );
};

export default HomePage;
