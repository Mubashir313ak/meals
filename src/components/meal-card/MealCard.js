import React from "react";
import "./MealCard.css";

function MealCard({ meal, onClick, isSelected }) {
  return (
    <div
      className={`meal-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="meal-image">
        <img src={meal.image} alt={meal.title} />
        <span className="meal-type">Dinner</span>
      </div>
      <div className="meal-content">
        <h3>{meal.name}</h3>
        <p>{meal.instructions[0]}</p>
        <div className="meal-footer">
          <p>
            <strong>Cuisine:</strong> {meal.cuisine}
          </p>
          <p>
            <strong>Rating:</strong> {meal.rating} ⭐
          </p>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
