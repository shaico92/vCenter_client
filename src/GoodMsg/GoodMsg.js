import React,{useEffect,useRef} from 'react'
import "./GoodMsg.css"
import Xbutton from '../assets/Xbtn'

const GoodMsg = ({msg,closeError})=>{

const xbtnDiv = useRef()
const msgbox = useRef();
useEffect(() => {
    setTimeout(() => {
        msgbox.current.style.opacity=0;
    }, 3000);
    setTimeout(() => {
        
        closeError();
    }, 3300);
}, [msg]);

const hoverInHandler=()=>{
    xbtnDiv.current.className="xbtnHover";
     xbtnDiv.current.parentElement.className="goodHover"
     xbtnDiv.current.children[0].attributes.fill.nodeValue="lightgreen"
    
}
const hoverOutHandler=()=>{
    xbtnDiv.current.className="xbtn";
    xbtnDiv.current.parentElement.className="good"
    xbtnDiv.current.children[0].attributes.fill.nodeValue="white"
    
}




    return (
        <div ref={msgbox}  onMouseOver={()=>hoverInHandler()} onMouseOut={()=>hoverOutHandler()} className="good">
            <div onClick={()=>closeError()}  ref={xbtnDiv}  className="xbtn">
            <Xbutton  fill="white"/>
            </div>
            
            <div>{msg}</div>
        </div> 
    )
}


export default GoodMsg;