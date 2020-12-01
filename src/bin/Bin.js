import React,{ useEffect, useState} from 'react';
import "./Bin.css";
import TrashBin from "../assets/bin.svg";

const Bin =({throwTrash,cancelDragBin})=>{
    const [aboutToThrow,setAboutToThrow] = useState(null);
    useEffect(()=>{
            console.log(cancelDragBin);
    },[cancelDragBin])

    

    const onDropHandler=(event)=>{

        event.preventDefault();
        
    const data=event.dataTransfer.getData("TrashBin");
        
            setAboutToThrow(null);
        
            throwTrash(data);
            console.log('dropped');
        
        
    }
    const allowDropHandler=(event)=>{
        console.log('dragging on bin');
        event.preventDefault();
        setAboutToThrow(true);        
        
    }

    return(
        <div className={"Bin"}   onDragOver={(event)=>allowDropHandler(event)} onDrop={(event)=>onDropHandler(event)}>
            {cancelDragBin ?<img className={"large"}  src={TrashBin}/>:<img className={"normal"}  src={TrashBin}/>}
        </div>
    )

}


export default Bin;