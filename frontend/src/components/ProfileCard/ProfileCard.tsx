import React from "react";
import styles from "./ProfileCard.module.css";

interface User {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
}

interface ProfileCardProps {
  user: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{getInitials(user.name)}</div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Status</span>
          <span className={styles.infoValue}>
            <span className={`${styles.badge} ${styles.verified}`}>
              ✓ Verified
            </span>
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Member Since</span>
          <span className={styles.infoValue}>
            {formatDate(user.createdAt)}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Last Login</span>
          <span className={styles.infoValue}>
            {formatDate(user.lastLogin)}
          </span>
        </div>
      </div>
    </div>
  );
};
