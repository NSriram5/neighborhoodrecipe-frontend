import React,{useState} from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function Search() {
    const history = useHistory();

    const blankForm = {
        input:""
    }

    const [formData,setFormData] = useState(blankForm);

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    return(
        <div className="w-75 m-auto pb-3">
            <input name="search" className="w-100 m-auto" value={formData["input"]} onChange={handleChange} autoComplete="search" placeholder="Search" />
        </div>
    )
}

export default Search