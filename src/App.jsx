import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import UserContext from "./userContext";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import RecipeDetail from "./RecipeDetail";
import UserPage from "./UserPage";

import NeighborhoodRecipeApi from "./api";

import logo from './logo.svg';
import './App.css';

function App() {
  let neighborhoodrecipe = new NeighborhoodRecipeApi;
  const [NeighborhoodRecipeObj, setNeighborhoodRecipeObj] = useState(neighborhoodrecipe);
  const [token, setToken] = useState(localStorage.getItem("token")||"");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))||{});

  useEffect(()=>{
    debugger;
    localStorage.setItem("token",token)
    if (token !== "") {
      const newNeighborhoodRecipeObj = NeighborhoodRecipeObj;
      newNeighborhoodRecipeObj.token = token;
      setNeighborhoodRecipeObj(newNeighborhoodRecipeObj);
      console.log(token);
    }
  },[token]);

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user))
  },[user]);

  const postNewRegistration = NeighborhoodRecipeObj.postNewRegistration.bind(NeighborhoodRecipeObj);
  const postNewLogin = NeighborhoodRecipeObj.postNewLogin.bind(NeighborhoodRecipeObj);
  const getListOfUsers = NeighborhoodRecipeObj.getListOfUsers.bind(NeighborhoodRecipeObj);
  const getOneUser = NeighborhoodRecipeObj.getOneUser.bind(NeighborhoodRecipeObj);
  const updateUser = NeighborhoodRecipeObj.updateUser.bind(NeighborhoodRecipeObj);
  const connectWithUser = NeighborhoodRecipeObj.connectWithUser.bind(NeighborhoodRecipeObj);
  const removeConnectWithUser = NeighborhoodRecipeObj.removeConnectWithUser.bind(NeighborhoodRecipeObj);
  const getAllRecipes = NeighborhoodRecipeObj.getAllRecipes.bind(NeighborhoodRecipeObj);
  const viewRecipes = NeighborhoodRecipeObj.viewRecipes.bind(NeighborhoodRecipeObj);
  const getRecipes = NeighborhoodRecipeObj.getRecipe.bind(NeighborhoodRecipeObj);
  const researchRecipe = NeighborhoodRecipeObj.researchRecipe.bind(NeighborhoodRecipeObj);
  const createRecipe = NeighborhoodRecipeObj.createRecipe.bind(NeighborhoodRecipeObj);
  const updateRecipe = NeighborhoodRecipeObj.updateRecipe.bind(NeighborhoodRecipeObj);
  const deleteRecipe = NeighborhoodRecipeObj.deleteRecipe.bind(NeighborhoodRecipeObj);

  const loadToken = async (type,obj)=>{
    debugger;
    let items;
    try{
      if (type=="register") {
        items = await postNewRegistration(obj);
      } else if (type=="login") {
        items = await postNewLogin(obj);
      }
      if (items.error) {
        return items.error
      }
      debugger;
      setToken(items.token);
      setUser(items.user);
      return true;
    } catch (err) {
      return err;
    }
  }

  const refreshUser = async(user)=> {
    const authSuccess = await postNewLogin({userName:user.userName,password:user.password});
    if (authSuccess.error) {
      return false;
    }
    const patchUser = await updateUser(user);
    if (patchUser.error) {
      return false;
    }
    delete user.password;
    setUser(user);
    return true;
  }

  function logout() {
    setToken("");
    setUser({});
  }

  function register(newUser) {
    const success = loadToken("register",newUser);
    return success;
  }

  function login(credentials) {
    return loadToken("login",credentials);
  }

  function navlinks(){
    let navItems = [];
    if (token==="") {
      navItems=[{title:"Login",link:"/login",active:true},{title:"Register",link:"/register",active:true}]
    } else {
      navItems=[{title:"Profile",link:"/profile",active:true},{title:"Logout",link:"/logout",active:true,onClick:logout}]
    }
    return navItems
  }

  return (
    <BrowserRouter>
    <UserContext.Provider value={user}>
    <NavBar links={navlinks()}/>
      <Switch>
        <Route exact path="/home">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <Login login={login} setToken={setToken}/>
        </Route>
        <Route exact path="/logout">
          <Redirect to="/"/>
        </Route>
        <Route exact path="/register">
          <Register register={register}/>
        </Route>
        <Route exact path="/recipe/:id">
          <RecipeDetail />
        </Route>
        <Route exact path="/profile">
          <UserPage refreshUser={refreshUser}/>
        </Route>
        <Redirect to="/home" />
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
