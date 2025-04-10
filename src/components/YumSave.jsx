import React, { useState } from 'react';
import './YumSave.css';

const YumSave = () => {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="yum-save-container">
      <h1>YumSave</h1>
      <p>Save and organize your favorite recipes!</p>
      
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes saved yet. Add your first recipe!</p>
        ) : (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))
        )}
      </div>
      
      <button className="add-recipe-btn">
        Add New Recipe
      </button>
    </div>
  );
};

export default YumSave; 