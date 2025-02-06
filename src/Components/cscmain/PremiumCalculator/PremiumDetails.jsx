import React from "react";

const PremiumDetails = () => {
  const styles = {
    section: {
      border: "1px solid #2b7a0b",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      color: "#2b7a0b",
      fontSize: "36px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
    },
    details: {
      textAlign: "left",
      lineHeight: "1.6",
      fontSize: "14px",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
    },
    bold: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.header}>₹ 95000</h2>
      <p style={{ textAlign: "center" }}>Premium Paid By Farmer</p>
      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span>Insurance Company:</span>
          <span style={styles.bold}>Future Generali India Insurance Co. Ltd.</span>
        </div>
        <div style={styles.detailRow}>
          <span>Farmer Share(%):</span>
          <span style={styles.bold}>0.5</span>
        </div>
        <div style={styles.detailRow}>
          <span>Actuarial Rate(%):</span>
          <span style={styles.bold}>0.5</span>
        </div>
        <div style={styles.detailRow}>
          <span>Cut Off Date:</span>
          <span style={styles.bold}>05-08-2023</span>
        </div>
        <div style={styles.detailRow}>
          <span>Crop:</span>
          <span style={styles.bold}>Groundnut (Pea Nut)</span>
        </div>
        <div style={styles.detailRow}>
          <span>Area(Hectare):</span>
          <span style={styles.bold}>25</span>
        </div>
        <div style={styles.detailRow}>
          <span>Premium Paid By Govt(Rs):</span>
          <span style={styles.bold}>0</span>
        </div>
        <div style={styles.detailRow}>
          <span>Sum Insured(Rs):</span>
          <span style={styles.bold}>1900000</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
