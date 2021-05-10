import React from "react";

function IngredientList({ingredients, deleteIngredient}) {
    return (
        <div>
            {ingredients.map((ingredient,indx)=>{
                return(
                    <div key={indx}>
                        <p className="d-inline p-2">
                        {`${ingredient.quantity} ${ingredient.measurement} ${ingredient.label} `}
                        { ingredient.prepInstructions ? ingredient.prepInstructions : null}
                        </p>
                        <button type="button" class="close float-none" aria-label="Close" onClick={(evt)=>deleteIngredient(evt,indx)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {ingredient.additionalInfo ? (<small>ingredient.additionalInfo</small>) : null}

                    </div>
                );
            })}
        </div>
    )
}

export default IngredientList;