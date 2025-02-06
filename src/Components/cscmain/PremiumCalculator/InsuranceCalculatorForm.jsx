import React from "react";
import CallBtn from "./CallBtn";

const InsurancePremiumCalculator = () => {
  return (
    <div style={{ padding: "0px" }}>
      <div
        style={{
          backgroundColor: "#075307",
          color: "white",
          textAlign: "center",
          padding: "10px",
          fontSize: "22px",
          borderRadius: "10px",
        }}
      >
        INSURANCE PREMIUM CALCULATOR
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ width: "65%" }}>
          <form>
            <div style={{ marginBottom: "30px" }}>
              <CallBtn />
            </div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label>Scheme *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>Pradhan Mantri Fasal Bima Yojana</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label >Year *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>2023</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label >Season *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>Kharif</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label >State *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>Angul</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label>District *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>Angul</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label >Crop *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>Groundnut (Pea nut)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
              <div style={{ flex: 1 }}>
                <label >Area in Hectare *</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px ",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>25</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <button
                style={{
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  padding: "10px 20px",
                  fontSize: "14px",
                }}
              >
                Calculate
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  color: "red",
                  border: "1px solid #DC2626",
                  borderRadius: "15px",
                  padding: "10px 35px",
                  fontSize: "14px",
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div
          style={{
            height: "100%",
            width: "30%",
            // Aborder: "20px solid #16A34A 0px 0px 0px",
            borderTop: "10px solid #16A34A",
            borderRight: "2px solid #16A34A",
            borderBottom: "2px solid #16A34A",
            borderLeft: "2px solid #16A34A",
            borderRadius: "20px 20px 10px 10px",
            padding: "15px 0 100px 0px",
            // AbackgroundColor: "#f9f9f9",
          }}
        >
          <h1
            style={{
              color: "#16A34A",
              textAlign: "center",
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            ₹ 95000
          </h1>
          <p
            style={{
              textAlign: "center",
              margin: 0,
              
              fontSize: "16px",
            }}
          >
            Premium Paid By Farmer
          </p>

          <table
            style={{
              width: "100%",
              marginTop: "15px",
              borderSpacing: "0",
              fontSize: "14px",
              padding:"0 0 100px 0",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}>Insurance Company</td>
                <td style={{ padding: "8px" }}>Future General India Insurance Co. Ltd.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{  padding: "8px" }}>Farmer Share(%)</td>
                <td style={{ padding: "8px" }}>0.5</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{  padding: "8px" }}>Actuarial Rate(%)</td>
                <td style={{ padding: "8px" }}>0.5</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{  padding: "8px" }}>Cut Off Date</td>
                <td style={{ padding: "8px" }}>05-08-2023</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{  padding: "8px" }}>Crop</td>
                <td style={{ padding: "8px" }}>Groundnut (Pea Nut)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{  padding: "8px" }}>Area(Hectare)</td>
                <td style={{ padding: "8px" }}>25</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{  padding: "8px" }}>Premium Paid By Govt(Rs)</td>
                <td style={{ padding: "8px" }}>0</td>
              </tr>
              <tr>
                <td style={{  padding: "8px" }}>Sum Insured(Rs)</td>
                <td style={{ padding: "8px" }}>1900000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsurancePremiumCalculator;
