import React, {useContext, useState, useEffect} from "react";
import { NavLink } from 'react-router-dom'
import UnAuthenticated from "./UnAuthenticated";
import UserContext from "./userContext";
import Search from "./Search";
import CompactRecipeList from "./CompactRecipeList";
import BroadRecipeList from "./BroadRecipeList";

function Dashboard({getRecipes, getRecipe, researchRecipe, createRecipe, deleteRecipe}) {
    const user = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [myRecipes, setMyRecipes] = useState([]);
    const [othersRecipes, setOthersRecipes] = useState([]);

    useEffect(()=>{
        async function getItems(){
            let recipes = await getRecipes();
            let selfUuId = user.userUuId
            if (recipes.error) return;
            let myRecipes = recipes.filter((item)=>item["User.userUuId"]==selfUuId);
            let othersRecipes = recipes.filter((item)=>item["User.userUuId"]!=selfUuId);
            setMyRecipes(myRecipes);
            setOthersRecipes(othersRecipes);
            setLoading(false);
        }
        if (loading) {
            getItems();
        }
    },[loading])

    const deleteAndUpdate = (uuid) => {
        async function doDelete() {
            await deleteRecipe(uuid)
            setLoading(true);
        }
        doDelete();
    }

    if (!user.userName) {
        return (
            <div className="pt-5">
            <div className="Homepage">
                <div className="container text-center">
                    <h1 className="mb-4 font-weight-bold">NeighborhoodRecipe</h1>
                    <p className="lead">Welcome to NeighborhoodRecipe, a convenient recipe sharing App.</p>
                    <p>
                        <a className="btn btn-primary font-weight-bold mr-3" href="/login">Log in</a>
                        <a className="btn btn-primary font-weight-bold" href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
        )
    }

    if (loading) {
        return (
            <>
                <Search/>
                <p>Loading</p>
            </>
        )
    }

    return (
        <div className="p-5">
            <Search/>
            <div className="row">
                <CompactRecipeList myRecipes = {myRecipes} deleteRecipe = {deleteAndUpdate}/>
                <BroadRecipeList othersRecipes = {othersRecipes}/>
            </div>
        </div>
    )
}

export default Dashboard