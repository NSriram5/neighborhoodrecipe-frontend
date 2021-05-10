import React, {useContext, useState, useEffect} from "react";
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
        <h6 className = "recipe-title">
            {thisRecipe.recipeName}
        </h6>
        <p>
            {`Servings: ${thisRecipe.servingCount}`}
        </p>
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