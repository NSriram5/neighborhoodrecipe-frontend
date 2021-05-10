import React from "react";
import { NavLink } from 'react-router-dom'
import "./RecipeCard.css";

function RecipeCard({recipe}) {

    return(
        <a className="RecipeCard card" href={`/recipe/${recipe.recipeUuid}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {recipe.recipeName}
                </h6>
                <p>
                    {recipe["User.userName"]}
                </p>{
                    recipe.dietCategory ? (
                <p className="d-inline">
                    {recipe.dietCategory.map((cat,indx)=>{return (<small className="d-inline" key={indx}>{`${cat} `}</small>)})}
                </p> ) :
                (<p></p>)}{
                    recipe.mealCategory ? (
                        <p className="d-inline">
                            {recipe.mealCategory.map((cat,indx)=>{return (<small className="d-inline" key={indx}>{`${cat} `}</small>)})}
                        </p>
                    ) :
                    (<p></p>)
                }
            </div>
            </a>
    )
}

export default RecipeCard