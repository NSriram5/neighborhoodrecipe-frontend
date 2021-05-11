import React, {useContext, useState, useEffect} from "react";
import {ReactComponent as Edit} from './edit.svg';
import { useParams } from 'react-router-dom'
import UserContext from "./userContext";

function RecipeDetail({getRecipe}) {
    const user = useContext(UserContext);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);
    const [thisRecipe, setThisRecipe] = useState({});

    useEffect(()=>{
        async function getThisRecipe(){
            let recipe = await getRecipe(id, user.token);
            setThisRecipe(recipe);
            if (recipe.userUuId == user.userUuId) {
                setEditable(true);
            }
            setLoading(false);
        }
        if (loading) {
            getThisRecipe();
        }
    },[loading]);

    if (loading) {
        return (
            <>
                <p>
                    Loading
                </p>
            </>
        )
    }

    return (
    <div className="w-75 pt-4 m-auto">
        
        <div className="row">
            <h3 className = "recipe-title border-bottom col-6">
                {thisRecipe.recipeName}
            { editable ? 
                <a className="position-absolute" style={{top:"0px",right:"0px"}} href={`/recipe/edit/${thisRecipe.recipeUuid}`}>
                    <Edit />
                </a>
                : null
            }
            </h3>
            <div className="col-6">
                
                <h4 className = "author-username text-right d-block mr-3">
                    {thisRecipe.User.userName}
                </h4>
                <h6 className = "author-email text-right d-block">
                    {thisRecipe.User.email}
                </h6>
            </div>
        </div>
        <div className="row border-bottom" style={{fontSize:".9rem"}}>
            <p className="col-2 border-right">
                Servings:{thisRecipe.servingCount?` ${thisRecipe.servingCount}`:null}
            </p>
            <p className="col-2 border-right">
                Oven Temp(F):{thisRecipe.farenheitTemp?` ${thisRecipe.farenheitTemp}`:null}
            </p>
            <p className="col-2 border-right">
                Total Time:{thisRecipe.minuteTotalTime?` ${thisRecipe.minuteTotalTime}`:null}
            </p>
            <p className="col-2 border-right">
                Prep Time:{thisRecipe.minutePrepTime?` ${thisRecipe.minutePrepTime}`:null}
            </p>
            <p className="col-2 border-right">
                Cook Time:{thisRecipe.minuteCookTime?` ${thisRecipe.minuteCookTime}`:null}
            </p>
            <p className="col-2 border-right">
                Bake Time:{thisRecipe.minuteBakeTime?` ${thisRecipe.minuteBakeTime}`:null}
            </p>
            
        </div>
        <div className="row">
            <div className="col-6">
                {
                    thisRecipe.instructions.map((step,indx)=>{return(
                        <p key={indx}>
                            {step}
                        </p>
                    )})
                }
            </div>
            <div className="col-6">
                {
                    thisRecipe.Ingredients ?
                    thisRecipe.Ingredients.map((ingredient,indx)=>{return(
                        <div key={indx}>
                            <p key={indx} className="d-block pb-1 mb-2">
                                {`${ingredient.quantity} ${ingredient.measurement} ${ingredient.label}`} 
                                {ingredient.prepInstructions ? ` ${ingredient.prepInstructions}` :
                                null
                                }
                                { ingredient.additionalInfo ? 
                                (<small className="d-block">{`${ingredient.additionalInfo}`}</small>) :
                                null
                                }
                            </p>
                        </div>
                    )}) :
                    null
                }
            </div>
        </div>
        <div className="row">

        </div>
        <div className="row">
            <div className="col-6">
                {
                thisRecipe.mealCategory ?
                thisRecipe.mealCategory.map((category,indx)=>{return(
                    <span className="badge badge-pill badge-info m-1" key={indx}>{` ${category}`}</span>
                )}):null}
            </div>
            <div className="col-6">
                {
                thisRecipe.dietCategory ?
                thisRecipe.dietCategory.map((category,indx)=>{return(
                    <span className="badge badge-pill badge-info m-1" key={indx}>{` ${category}`}</span>
                )}):null}
            </div>
        </div>
    </div>
    )
}

export default RecipeDetail