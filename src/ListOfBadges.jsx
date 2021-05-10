import React from "react";

function ListOfBadges({items, deleteItem}) {
    return (
        <div>
            {items.map((item,indx)=>{
                return(
                    <span key={indx} className="badge badge-info badge-pill">{item}
                    <button type="button" onClick={(evt)=>deleteItem(evt,indx)} class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </span>
                );
            })}
        </div>
    )
}

export default ListOfBadges;