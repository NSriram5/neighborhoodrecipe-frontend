import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import IngredientsList from "./IngredientList";
import ListOfBadges from "./ListOfBadges";
import ListOfSteps from "./ListofSteps";
import UserContext from "./userContext";

function RecipeForm({lookupAutoCompletes, completeForm, getRecipe}) {
    const user = useContext(UserContext);
    const history = useHistory();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [thisRecipe, setThisRecipe] = useState({});
    const measurementTypes = ['teaspoon', 'teaspoons', 'tablespoon', 'tablespoons', 'cup', 'cups', 'quart', 'quarts', 'gallon', 'gallons', 'lb', 'oz', 'pinch', 'whole', 'can'];
    const blankForm = {
        recipeName: "",
        mealCategory: [],
        dietCategory: [],
        servingCount: "",
        websiteReference: "",
        farenheitTemp: "",
        minuteTimeBake: "",
        minuteTotalTime: "",
        minutePrepTime: "",
        minuteCookTime: "",
        instructions: [],
        ingredients: [],
        toolsNeeded: "",
        photoUrl: "",
    }

    const blankIngForm = {
        quantity: "",
        measurement: "",
        label: "",
        prepInstructions: "",
        additionalInfo: "",
    }

    useEffect(()=>{
        async function getThisRecipe(){
            let recipe = await getRecipe(id,user.token);
            setThisRecipe(recipe);
            blankForm.recipeName = recipe.recipeName || "";
            blankForm.mealCategory = recipe.mealCategory || [];
            blankForm.dietCategory = recipe.dietCategory || [];
            blankForm.servingCount = recipe.servingCount || "";
            blankForm.websiteReference = recipe.websiteReference || "";
            blankForm.farenheitTemp = recipe.farenheitTemp || "";
            blankForm.minuteTimeBake = recipe.minuteTimeBake || "";
            blankForm.minuteTotalTime = recipe.minuteTotalTime || "";
            blankForm.minutePrepTime = recipe.minutePrepTime || "";
            blankForm.minuteCookTime = recipe.minuteCookTime || "";
            blankForm.instructions = recipe.instructions || [];
            blankForm.ingredients = recipe.Ingredients.map((ing)=>{return {
                label: ing.label,
                measurement: ing.measurement,
                quantity: ing.quantity,
                prepInstructions: ing.prepInstructions,
                additionalInfo: ing.additionalInfo
            }}) || [];
            blankForm.toolsNeeded = recipe.toolsNeeded || "";
            blankForm.photoUrl = recipe.photoUrl || "";
            debugger;
            setLoading(false);
        }
        if (loading && id!=undefined) {
            getThisRecipe();
        }
    },[loading]);
    
    const [formData,setFormData] = useState(blankForm);
    const [ingredientForm, setIngredientForm] = useState(blankIngForm);
    const [instructionForm, setInstructionForm] = useState({step:""});
    const [mealCategoryForm, setMealCatForm] = useState("");
    const [dietCategoryForm, setDietCatForm] = useState("");
    const [existingIngredients, setExistingIngredients] = useState([]);
    const [ingredientError, setIngredientError] = useState([]);
    const [errors,setErrors] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");

    
    useEffect(()=>{
        const loadAutoCompletes = async ()=> {
            const responses = await lookupAutoCompletes(searchTerm);
            setExistingIngredients(responses.map((item)=>item.label));
        }
        if (searchTerm.length >= 3) {
            loadAutoCompletes();
        }
    },[searchTerm])
    
    const handleCategoryFormChange = (evt) => {
        const {name,value} = evt.target;
        if (name == "mealCategory") {
            setMealCatForm(value);
        } else if (name == "dietCategory") {
            setDietCatForm(value);
        }
    }

    const addDietCategory = (evt) => {
        evt.preventDefault();
        let dietCats = [...formData["dietCategory"]];
        if (dietCategoryForm != "") {
            dietCats.push(dietCategoryForm);
            setFormData(data=>({...data,["dietCategory"]:dietCats}));
            setDietCatForm("");
        }
    }

    const addMealCategory = (evt) => {
        evt.preventDefault();
        let mealCats = [...formData["mealCategory"]];
        if (mealCategoryForm != "") {
            mealCats.push(mealCategoryForm);
            setFormData(data=>({...data,["mealCategory"]:mealCats}));
            setMealCatForm("");
        }
    }

    const deleteDietCategory = (evt,indx) => {
        evt.preventDefault();
        let dietCats = [...formData["dietCategory"]];
        dietCats.splice(indx,1);
        setFormData(data=>({...data,["dietCategory"]:dietCats}));
    }

    const deleteMealCategory = (evt,indx) => {
        evt.preventDefault();
        let mealCats = [...formData["mealCategory"]];
        mealCats.splice(indx,1);
        setFormData(data=>({...data,["mealCategory"]:mealCats}));
    }

    const handleInstructionFormChange = (evt) => {
        const {name,value} = evt.target;
        setInstructionForm({step:value});
    }

    const addInstruction = (evt) => {
        evt.preventDefault();
        let instructions = [...formData["instructions"]];
        if (instructionForm.step != "") {
            instructions.push(instructionForm.step);
            setFormData(data=>({...data,["instructions"]:instructions}));
            setInstructionForm({step:""});
        }
    }


    const deleteInstruction = (evt,indx) => {
        evt.preventDefault();
        let instructions = [...formData["instructions"]];
        instructions.splice(indx,1);
        setFormData(data=>({...data,["instructions"]:instructions}));
    }

    const handleIngFormChange = (evt) => {
        const {name,value} = evt.target;
        if (name == "label" && value.length >= 3) {
            let beginning3 = value.slice(0,3);
            if (beginning3 != searchTerm) {
                setSearchTerm(beginning3);
            }
        } else if (name == "label" && value.length < 3) {
            setSearchTerm("");
            setExistingIngredients([]);
        }
        setIngredientForm(data=>({
            ...data,[name]:value
        }));
    }
    
    const addIngredient = (evt) => {
        evt.preventDefault();
        let ingredients = [...formData["ingredients"]];
        let errors = [];
        if (!(measurementTypes.includes(ingredientForm.measurement))) {
            errors.push(`${ingredientForm.measurement} is not an allowed measurement type`);
        }
        if (ingredientForm.quantity < 0) {
            errors.push(`The quantity of the ingredient cannot be negative`);
        }
        if (errors.length > 0) {
            setIngredientError(errors);
            return;
        }
        setIngredientError([]);
        ingredients.push(ingredientForm);
        setIngredientForm(blankIngForm);
        setFormData(data=>({...data,["ingredients"]:ingredients}));
    }

    function printIngredientErrors() {
        if (ingredientError.length!=0) {
            return(
                <div className="alert alert-danger" role="alert">
                    {ingredientError.map((err,index)=>{return(
                        <p key={index} className="mb-0 small">{err}</p>
                        )
                    })}
                </div>
            )
        }
    }

    const deleteIngredient = (evt,indx) => {
        evt.preventDefault();
        let ingredients = [...formData["ingredients"]];
        ingredients.splice(indx,1);
        setFormData(data=>({...data,["ingredients"]:ingredients}));
    }

    function printErrors(){
        debugger;
        if (errors.error && errors.length!=0){
            return(
                <div className="alert alert-danger" role="alert">
                    {errors.error.map((err,index)=>{return(
                        <p key={index} className="mb-0 small">{err}</p>
                        )
                    })}
                </div>
            )
        }
    }

    const handleChange = (evt) => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await setErrors([]);
        const success = await completeForm(formData);
        if (success=="Recipe has been created") {
            setFormData(blankForm);
            history.push("/home");
        } else {
            await setErrors(success);
        }
    }

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
        <div className="pt-5">
        <div className="RecipeForm">
            <div className="container col-md-6 offset-md-3 col-lg-12 offset-lg-0">
                <h2 className="mb-3">Recipe Form</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group border-bottom">
                                <div className="form-group d-inline-block px-2">
                                    <label>Recipe Name</label>
                                    <input name="recipeName" className="form-control" value={formData["recipeName"]} onChange={handleChange} autoComplete="recipeName"/>
                                </div>
                                <div className="form-group d-inline-block px-2">
                                    <label>Website Reference</label>
                                    <input name="websiteReference" className="form-control" value={formData["websiteReference"]} onChange={handleChange} autoComplete="websiteReference"/>
                                </div>
                            </div>
                            <div className="form-group border-bottom">
                                <div className="form-group d-inline-block col-3 px-2">
                                    <label>Serving Count</label>
                                    <input type="number" min="0" name="servingCount" className="form-control" value={formData["servingCount"]} onChange={handleChange} autoComplete="servingCount" style={{width:"5rem"}}/>
                                </div>
                                <div className="form-group d-inline-block px-2">
                                    <label>Set Oven Temperature</label>
                                    <input type="number" min="0" name="farenheitTemp" className="form-control" value={formData["farenheitTemp"]} onChange={handleChange} autoComplete="farenheitTemp" style={{width:"5rem"}}/>
                                </div>
                            </div>
                            {/* Ingredients entry */}
                            <div className="form-group border-bottom" style={{fontSize:".75rem"}}>
                                <IngredientsList ingredients={formData.ingredients} deleteIngredient={deleteIngredient} />
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Quantity</label>
                                    <input type="number" min="0" name="quantity" className="form-control" value={ingredientForm["quantity"]} onChange={handleIngFormChange} style={{width:"5rem",fontSize:".7rem"}}/>
                                </div>
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Measurement</label>
                                    <input type="text" list="measures" name="measurement" className="form-control" value={ingredientForm["measurement"]} onChange={handleIngFormChange} style={{width:"8rem",fontSize:".7rem"}}/>
                                    <datalist id="measures">
                                        {measurementTypes.map((measure)=>{return(<option>{measure}</option>)
                                        })}
                                    </datalist>
                                </div>
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Ingredient</label>
                                    <input min="0" list="existingIngredients" autocomplete="off" name="label" className="form-control" value={ingredientForm["label"]} onChange={handleIngFormChange} style={{width:"12rem",fontSize:".7rem"}}/>
                                    <datalist id="existingIngredients">
                                        {existingIngredients.map((ing)=>{return(<option>{ing}</option>)
                                        })}
                                    </datalist>
                                </div>
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Preparation Instructions</label>
                                    <input min="0" name="prepInstructions" className="form-control" value={ingredientForm["prepInstructions"]} onChange={handleIngFormChange} style={{width:"12rem",fontSize:".7rem"}}/>
                                </div>
                                <button onClick={addIngredient} className="btn btn-success mx-2 px-2">
                                    +
                                </button>
                                {
                                    printIngredientErrors()
                                }    
                            </div>
                            {/* Instruction entries */}
                            <div className="form-group border-bottom px-2 pb-3" style={{fontSize:".75rem"}}>
                                <ListOfSteps items={formData.instructions} deleteItem={deleteInstruction} />
                                <label className="d-block">InstructionSteps</label>
                                <input min="0" name="step" className="form-control d-inline-block" value={instructionForm["step"]} onChange={handleInstructionFormChange} style={{width:"32rem", height:"2rem",fontSize:".8rem"}}/>
                                <button onClick={addInstruction} className="btn btn-success d-inline mx-2 px-2">
                                    +
                                </button>
                            </div>
                            {/* Prep timing entries */}
                            <div className="form-group border-bottom">
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Minutes of prep time</label>
                                    <input type="number" min="0" name="minutePrepTime" className="form-control" value={formData["minutePrepTime"]} onChange={handleChange} autoComplete="minutePrepTime" style={{width:"5rem"}}/>
                                </div>
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Minutes of cooking time</label>
                                    <input type="number" min="0" name="minuteCookTime" className="form-control" value={formData["minuteCookTime"]} onChange={handleChange} autoComplete="minuteCookTime" style={{width:"5rem"}}/>
                                </div>
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Minutes of baking time</label>
                                    <input type="number" min="0" name="minuteTimeBake" className="form-control" value={formData["minuteTimeBake"]} onChange={handleChange} autoComplete="minuteTimeBake" style={{width:"5rem"}}/>
                                </div>
                                <div className="form-group d-inline-block px-2 border-right">
                                    <label>Minutes of total time</label>
                                    <input type="number" min="0" name="minuteTotalTime" className="form-control" value={formData["minuteTotalTime"]} onChange={handleChange} autoComplete="minuteTotalTime" style={{width:"5rem"}}/>
                                </div>
                            </div>
                            {/* Tools needed entry */}
                            <div className="form-group border-bottom p-2">
                                <label>Tools needed</label>
                                <input name="toolsNeeded" className="form-control" value={formData["toolsNeeded"]} onChange={handleChange} autoComplete="toolsNeeded"/>
                            </div>
                            {/* Categories entries */}
                            <div className="form-group border-bottom row">
                                <div className="form-group col-6">
                                    <ListOfBadges items={formData["dietCategory"]} deleteItem = {deleteDietCategory} />
                                    <label>Diet Categories</label>
                                    <input name="dietCategory" className="form-control d-inline w-75" value={dietCategoryForm} onChange={handleCategoryFormChange} />
                                    <button onClick={addDietCategory} className="btn btn-success d-inline mx-2 px-2">
                                    +
                                    </button>
                                </div>
                                <div className="form-group col-6">
                                    <ListOfBadges items={formData["mealCategory"]} deleteItem = {deleteMealCategory} />
                                    <label>Meal Categories</label>
                                    <input name="mealCategory" className="form-control d-inline w-75" value={mealCategoryForm} onChange={handleCategoryFormChange} />
                                    <button onClick={addMealCategory} className="btn btn-success d-inline-block mx-2 px-2">
                                    +
                                </button>
                                </div>
                            </div>
                            {/* Photo url entry */}
                            <div className="form-group border-bottom">
                                <label>URL to location of photo</label>
                                <input name="photoUrl" className="form-control" value={formData["photoUrl"]} onChange={handleChange} autoComplete="photoUrl"/>
                            </div>
                            {printErrors()}
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default RecipeForm;