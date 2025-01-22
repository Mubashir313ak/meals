import React, { useEffect, useState } from "react";
import "./Meal.css";
import Header from "../../components/header/Header";
import Tabs from "../../components/tabs/Tabs";
import MealCard from "../../components/meal-card/MealCard";

function Meal() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [weekMeals, setWeekMeals] = useState({
    "Week 1": [],
    "Week 2": [],
    "Week 3": [],
    "Week 4": [],
  });
  const [currentWeek, setCurrentWeek] = useState("All Meals");

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const handleAddMealToWeek = () => {
    if (selectedMeal && currentWeek !== "All Meals") {
      if (!weekMeals[currentWeek].find((meal) => meal.id === selectedMeal.id)) {
        setWeekMeals((prev) => ({
          ...prev,
          [currentWeek]: [...prev[currentWeek], selectedMeal],
        }));
        alert(`${selectedMeal.name} added to ${currentWeek}`);
      } else {
        alert(`${selectedMeal.name} is already added to ${currentWeek}`);
      }
    } else {
      alert("Please select a week first.");
    }
  };

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleSelectWeek = (week) => {
    setCurrentWeek(week);
  };

  const handleRemoveMealFromWeek = (meal, week) => {
    setWeekMeals((prev) => ({
      ...prev,
      [week]: prev[week].filter((m) => m.id !== meal.id),
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <Header />
      <Tabs
        handleSelectWeek={handleSelectWeek}
        handleAddToWeek={handleAddMealToWeek}
        currentWeek={currentWeek}
        isMealSelected={selectedMeal !== null}
      />

      {currentWeek === "All Meals" ? (
        <div className="meal-grid">
          {recipes?.map((meal, index) => (
            <MealCard
              key={index}
              meal={meal}
              onClick={() => handleSelectMeal(meal)}
              isSelected={selectedMeal?.id === meal.id}
            />
          ))}
        </div>
      ) : (
        <div className="week-meals">
          <h3>{currentWeek}</h3>
          <div className="meal-grid">
            {weekMeals[currentWeek].map((meal) => (
              <div key={meal.id} className="meal-card">
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
                <button
                  className="remove-button"
                  onClick={() => handleRemoveMealFromWeek(meal, currentWeek)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Meal;
