import React from "react";
import styles from "./SessionCard.module.css";

interface Session {
  loginTime: string;
  ipAddress?: string;
  userAgent?: string;
}

interface SessionCardProps {
  sessions: Session[];
}

export const SessionCard: React.FC<SessionCardProps> = ({ sessions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBrowserInfo = (userAgent?: string) => {
    if (!userAgent) return "Unknown Browser";

    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown Browser";
  };

  const getDeviceInfo = (userAgent?: string) => {
    if (!userAgent) return "Unknown Device";

    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "MacOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
      return "iOS";
    return "Unknown Device";
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Recent Sessions</h3>
      <div className={styles.sessionList}>
        {sessions && sessions.length > 0 ? (
          sessions
            .slice()
            .reverse()
            .map((session, index) => (
              <div key={index} className={styles.sessionItem}>
                <div className={styles.sessionIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className={styles.sessionInfo}>
                  <div className={styles.sessionHeader}>
                    <span className={styles.browser}>
                      {getBrowserInfo(session.userAgent)}
                    </span>
                    <span className={styles.device}>
                      {getDeviceInfo(session.userAgent)}
                    </span>
                  </div>
                  <div className={styles.sessionDetails}>
                    <span className={styles.time}>
                      {formatDate(session.loginTime)}
                    </span>
                    {session.ipAddress && (
                      <span className={styles.ip}>{session.ipAddress}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className={styles.noSessions}>No sessions found</p>
        )}
      </div>
    </div>
  );
};
