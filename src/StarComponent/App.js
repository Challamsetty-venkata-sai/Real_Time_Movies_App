

import { useState } from "react";

export function StarComponent({ maxlength = 5 ,onset}) {
    const [starstate, setstarstate] = useState(0); // Stores the selected stars
    const [hoverstate, sethoverstate] = useState(0); // Stores the hovered stars

    function handleStarClick(index) {
        setstarstate(index); // Set selected rating
        onset(index);
    }

    return (
        <div className="starouter" style={{display:"flex",justifyContent:"center",gap:"10px",border:"none",marginBottom:"10px",marginTop:"10px"}}>
            <div className="starinner"style={{border:"none"}}>
                {Array.from({ length: maxlength }, (_, i) => (
                    <Star
                        key={i + 1}
                        id={i + 1}
                        onStarClick={handleStarClick}
                        isFilled={i + 1 <= (hoverstate || starstate)} // Highlight based on hover or selection
                        onMouseIn={() => sethoverstate(i + 1)}
                        onMouseOut={() => sethoverstate(0)}
                    />
                ))}
            </div>
            <p style={{marginTop:"5px",fontSize:"18px",color:"white",marginLeft:"3px"}}>{hoverstate === 0 ? starstate : hoverstate}</p>
        </div>
    );
}

function Star({ onStarClick, id, isFilled, onMouseIn, onMouseOut }) {
    return (
        <span
            style={{color:"yellow",fontSize:"22px"}}
            role="button"
            id={id}
            onClick={() => onStarClick(id)}
            onMouseEnter={onMouseIn}
            onMouseLeave={onMouseOut}
        >
            <i style={{ color: isFilled ? "yellow" : "" ,}} className={isFilled ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        </span>
    );
}
