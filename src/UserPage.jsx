import React, { useContext, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import UserContext from "./userContext";

function UserPage() {
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [emailSearchForm, setEmailSearchForm] = "";
    const [userUpdateForm, setUserUpdateForm] = []


    return(
    <div>UserPage</div>
    )
}

export default UserPage