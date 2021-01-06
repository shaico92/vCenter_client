import React,{useEffect,useState,useRef} from 'react'

import './sshEnableForm.css'

const EnableSSH = ({enableSSH})=>{
    const [open, setopen] = useState(null);
    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);
    const [IP, setIP] = useState(null);
    const formSSH= useRef(null);
    useEffect(() => {
      if (formSSH.current) {
        //formSSH.current.focus()
        //formSSH.current.children[0].focus();
        formSSH.current.children[0].children[0].focus()
      }
    }, [open]);

const closeOpenForm=()=>{

    if (!open||open===false) {
        setopen(true);
      //  ipInput.current.focus()
    } else {
        setopen(false);
    }
    
}


const form = <div ref={formSSH} className="sshForm">
        <div  className="sshFormChild">
        <input
            
            onChange={(event)=>setIP(event.target.value)}
            type="text"
            max="15"
            placeholder="Please enter ip"
          ></input>
          </div>
          <div className="sshFormChild"> <input
          onChange={(event)=>setUsername(event.target.value)}
            type="text"
            placeholder="Please enter username"
          ></input></div>
          <div className="sshFormChild">  <input
          onChange={(event)=>setPassword(event.target.value)}
          placeholder="Please enter password"
            type="password"
            
          ></input></div>
          <div className="sshFormChild"> <button className="enableFormBtn"
            onClick={()=>enableSSH({ip: IP,username: Username,pass : Password})}
          >
            EnableSSH
          </button></div>
         
        
         

</div>;

    return (
        <div >
            <div className="enableFormBtn" onClick={closeOpenForm}>EnableSSH </div>
            {open&&open===true ? 
            form:null
            
            
            }
        </div>
    )
}

export default EnableSSH;


