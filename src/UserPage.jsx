import React, { useContext, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import UserContext from "./userContext";

function UserPage(updateUser, connectWithUser, removeConnectWithUser, ) {
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const defaultUserForm
    const [emailSearchForm, setEmailSearchForm] = "";
    const [userUpdateForm, setUserUpdateForm] = []


    return(
    <div>UserPage
        <div className="row">
            <div className="col-6">
                User Info change values here and submit with correct password
                <form onSubmit={handleUserUpdate}>
                    <label>Username</label>
                    <input name="username" className="form-control" onChange={handleUserInfoFormChange} value={userUpdateForm.userName}/>
                    <label>Email</label>
                    <input name="email" className="form-control" onChange={handleUserInfoFormChange} value={userUpdateForm.email}/>
                    <label>View Nutrition Data</label>
                    <input name="wantsNutritionData" className="form-control" onChange={handleUserInfoFormChange} value={userUpdateForm.wantsNutritionData}/>
                    div.custom-control.custom-switch
                    <div className="custom-control custom-switch">
                        <input type="checkbox" name="privateProfile" className="form-control form-check-input custom-control-input" onChange={handleUserInfoFormChange} value={userUpdateForm.privateProfile}/>
                        <label className="form-check-label custom-control-label">Profile will not appear in search</label>
                    </div>
                    <label>Old Password to Confirm Change</label>
                    <input type="password" onChange={handleUserInfoFormChange} value={userUpdateForm.oldPassword}/>
                    <label>New Password if Desired</label>
                    <input type="password" onChange={handleUserInfoFormChange} value={userUpdateForm.newPassword}/>
                    <button className="btn btn-primary">Update Profile</button>
                </form>
            </div>
            <div className="col-6">
                Connected Users
                <div className="addUser">
                    <div className="form-group">
                        <label>Other User's Email</label>
                        <input name="searchUserEmail" className="form-control" value={emailSearchForm} onChange={handleEmailSearchChange}/>
                        <div className="result">
                            Results go here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserPage