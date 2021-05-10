import React from "react";
import { NavLink } from 'react-router-dom';
import RecipeCardCompact from './RecipeCardCompact';

function CompactRecipeList({myRecipes, deleteRecipe}) {

    

    return(
        <div className= "col-4" >My Recipes
            <a className="card" href={`/create`}>
                <div className="card-body">
                    <h6 className="card-title">
                        + Add New Recipe
                    </h6>
                </div>
            </a>
            { myRecipes.map((recipe)=>{return (
                <RecipeCardCompact key={recipe.recipeUuid} recipe={recipe} deleteRecipe={deleteRecipe} />
            )})}
        </div>
    )
}

export default CompactRecipeList