import React,{useEffect,useState} from 'react'

import './sshEnableForm.css'

const EnableSSH = ({enableSSH})=>{
    const [open, setopen] = useState(null);
    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);
    const [IP, setIP] = useState(null);

    useEffect(() => {
        
    }, [open]);

const closeOpenForm=()=>{

    if (!open||open===false) {
        setopen(true);
    } else {
        setopen(false);
    }
}


const form = <div className="sshForm">
<input
            
            onChange={(event)=>setIP(event.target.value)}
            type="text"
            max="15"
            placeholder="Please enter ip"
          ></input>
          <input
          onChange={(event)=>setUsername(event.target.value)}
            type="text"
            placeholder="Please enter username"
          ></input>
          <input
          onChange={(event)=>setPassword(event.target.value)}
          placeholder="Please enter password"
            type="password"
            
          ></input>
          <button className="enableFormBtn"
            onClick={()=>enableSSH({ip: IP,username: Username,pass : Password})}
          >
            EnableSSH
          </button>

</div>;

    return (
        <div >
            <div className="enableFormBtn" onClick={closeOpenForm}>enable ssh</div>
            {open&&open===true ? 
            form:
            null}
        </div>
    )
}

export default EnableSSH;


