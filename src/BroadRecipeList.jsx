import React from "react";
import { NavLink } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function BroadRecipeList({othersRecipes}) {

    return(
        <div className= "col-8">Recipe's Of Other People
            { othersRecipes.map((recipe)=>{return (
                <RecipeCard key={recipe.recipeUuid} recipe={recipe} />
            )})}
        </div>
    )
}

export default BroadRecipeList