import React from "react";
import { NavLink } from 'react-router-dom';
import "./RecipeCard.css";

function RecipeCardCompact({recipe, deleteRecipe}) {

    const deleteItem = (evt,uuid) => {
        evt.preventDefault();
        deleteRecipe(uuid);
    }

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
                <div className="position-absolute p-3" style={{top:"0px",right:"0px"}}>
                    <button type="button" onClick={(evt)=>deleteItem(evt,recipe.recipeUuid)} className="close float-none " style={{top:"0px",right:"0px"}}aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </a>
    )
}

export default RecipeCardCompact