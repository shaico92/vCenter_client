import React from 'react';
import "./Bin.css";
import TrashBin from "../assets/bin.svg";

const Bin =({throwTrash})=>{


    const onDropHandler=(event)=>{
        event.preventDefault();
    const data=event.dataTransfer.getData("TrashBin");
        console.log(data);
        throwTrash(data);
        console.log('dropped');
    }
    const allowDropHandler=(event)=>{
        event.preventDefault();
    }

    return(
        <div className={"Bin"} onDragOver={(event)=>allowDropHandler(event)} onDrop={(event)=>onDropHandler(event)}>
            <img  src={TrashBin}/>
        </div>
    )

}


export default Bin;