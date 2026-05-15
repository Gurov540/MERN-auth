import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Button } from "../../shared/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { ProfileCard } from "../../components/ProfileCard";
import { SessionCard } from "../../components/SessionCard";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1 className={styles.logo}>Dashboard</h1>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </nav>

      <div className={styles.content}>
        <div className={styles.grid}>
          <ProfileCard user={user} />
          <SessionCard sessions={user.sessions || []} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
