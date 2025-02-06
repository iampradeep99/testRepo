import React from "react";

const CallerInfo = () => {
  const styles = {
    section: {
    //   Aborder: "1px solid #2b7a0b",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
      backgroundColor: "#fff",
    //   AboxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    header: {
      backgroundColor: "#075307",
      width: "70%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      padding: "15px",
      borderRadius: "30px",
      fontSize: "20px",
      textAlign: "center",
    },
    row: {
      display: "flex",
      gap: "20px",
    },
    group: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "5px",
      fontSize: "14px",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
    },
  };

  return (
    <div style={styles.section}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>CALLER INFORMATION</h2>
      </div>
      <div style={styles.row}>
        <div style={styles.group}>
          <label style={styles.label}>Caller ID *</label>
          <input style={styles.input} type="text" value="DI34567890" readOnly />
        </div>
        <div style={styles.group}>
          <label style={styles.label}>Farmer Name *</label>
          <input style={styles.input} type="text" value="Rohit Kumar" readOnly />
        </div>
        <div style={styles.group}>
          <label style={styles.label}>Caller Mobile Number *</label>
          <input style={styles.input} type="text" value="9711215678" readOnly />
        </div>
      </div>
    </div>
  );
};

export default CallerInfo;
