import React,{ useEffect, useState} from 'react';
import "./Bin.css";
import TrashBin from "../assets/bin.svg";

const Bin =({throwTrash,removeDrag})=>{
    const [aboutToThrow,setAboutToThrow] = useState(null);
    useEffect(()=>{
            setAboutToThrow(null)
            console.log(window.location.hostname);
    },[removeDrag])

    

    const onDropHandler=(event)=>{

        event.preventDefault();
        
    const data=event.dataTransfer.getData("TrashBin");
    
    setAboutToThrow(null);
            
    
            
            
        
            throwTrash(data);
    
            console.log(`putting ${data} in trash `);
        
        
        
    }
    const allowDropHandler=(event)=>{
         
        event.preventDefault();
        
        
        
        console.log("on trash bin");
        
            
        
        
        
        
         setAboutToThrow(1)
        
    }

    return(
        <div className={"Bin"}  onDragLeave={()=>setAboutToThrow(null)}  onDragOver={(event)=>allowDropHandler(event)} onDrop={(event)=>onDropHandler(event)}>
            {aboutToThrow ?<img draggable={false} className={"large"} alt="#"  src={TrashBin}/>:<img className={"normal"} draggable={false} src={TrashBin} alt="#"/>}
        </div>
    )

}


export default Bin;