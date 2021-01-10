import React,{useEffect,useRef} from 'react'
import "./ErrorMsg.css"
import Xbutton from '../assets/Xbtn'

const Error = ({msg,closeError})=>{

const xbtnDiv = useRef()
const msgboxErr = useRef();
useEffect(() => {
    setTimeout(() => {
        msgboxErr.current.style.opacity=0;
    }, 3000);
    setTimeout(() => {
        
        closeError();
    }, 6500);
    
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
        <div ref={msgboxErr}  onMouseOver={()=>hoverInHandler()} onMouseOut={()=>hoverOutHandler()} className="error">
            <div onClick={()=>closeError()}  ref={xbtnDiv}  className="xbtn">
            <Xbutton  fill="white"/>
            </div>
            
            <div>{msg}</div>
        </div> 
    )
}


export default Error;