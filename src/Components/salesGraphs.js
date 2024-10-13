import React, { useEffect, useState } from "react";
import { indianCurrency, parseDate } from "../Helper/helperFunctions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function SalesGRaphs(props) {
  const { currentMonthSale, targetSale } = props;
  const salesRatio = currentMonthSale / targetSale;
  const percentage = Math.ceil(salesRatio * 100);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CircularProgressbar
            value={currentMonthSale}
            maxValue={targetSale}
            text={`${percentage}%`}
          />
          <p className="home-headings">Current Month Sales</p>
          <div style={{ color: "Green" }}>
            {currentMonthSale ? indianCurrency.format(currentMonthSale) : ""}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p className="home-headings">Target</p>
            <div style={{ color: "Green" }}>
              {indianCurrency.format(targetSale)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p className="home-headings">Sales required</p>
        <div style={{ color: "Green" }}>
          {indianCurrency.format(targetSale - currentMonthSale)}
        </div>
      </div>
    </>
  );
}
