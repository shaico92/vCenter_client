import React,{useEffect,useRef} from 'react'
import "./ErrorMsg.css"
import Xbutton from '../assets/Xbtn'

const Error = ({msg,closeError})=>{

const xbtnDiv = useRef()

useEffect(() => {
    console.log(xbtnDiv.current);
}, [msg,]);

const hoverInHandler=()=>{
    xbtnDiv.current.className="xbtnHover";
     xbtnDiv.current.parentElement.className="errorHover"
     xbtnDiv.current.children[0].attributes.fill.nodeValue="salmon"
    
}
const hoverOutHandler=()=>{
    xbtnDiv.current.className="xbtn";
    xbtnDiv.current.parentElement.className="error"
    xbtnDiv.current.children[0].attributes.fill.nodeValue="white"
    
}




    return (
        <div  onMouseOver={()=>hoverInHandler()} onMouseOut={()=>hoverOutHandler()} className="error">
            <div onClick={()=>closeError()}  ref={xbtnDiv}  className="xbtn">
            <Xbutton  fill="white"/>
            </div>
            
            <div>{msg}</div>
        </div> 
    )
}


export default Error;