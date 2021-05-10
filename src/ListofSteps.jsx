import React from "react";

function ListOfSteps({items, deleteItem}) {
    return (
        <div>
            {items.map((item,indx)=>{
                return(
                    <div key={indx} className="">{item}
                    <button type="button" onClick={(evt)=>deleteItem(evt,indx)} className="close float-none" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                );
            })}
        </div>
    )
}

export default ListOfSteps;