import React from "react";
import "./Tabs.css";

function Tabs({
  handleSelectWeek,
  handleAddToWeek,
  currentWeek,
  isMealSelected,
}) {
  return (
    <div className="tabs">
      {["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"].map((week) => (
        <button
          key={week}
          className={`tab ${currentWeek === week ? "active" : ""}`}
          onClick={() => handleSelectWeek(week)}
        >
          {week}
        </button>
      ))}
      {currentWeek !== "All Meals" && isMealSelected && (
        <button onClick={handleAddToWeek}>Add To Week</button>
      )}
    </div>
  );
}

export default Tabs;
