import React,{useState,useRef} from 'react';
import Xbutton from '../assets/Xbtn'
import "./NewHost.css"
const NewHostForm = ({addHost})=>{

const newHostBtn= useRef()

const [newHost, setNewHost] = useState(null);
const [ipInput, setipInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const validateIP = (e) => {
    const key = e.key;

    if (
      (parseInt(key) !== 0 &&
        parseInt(key) !== 1 &&
        parseInt(key) !== 2 &&
        parseInt(key) !== 3 &&
        parseInt(key) !== 4 &&
        parseInt(key) !== 5 &&
        parseInt(key) !== 6 &&
        parseInt(key) !== 7 &&
        parseInt(key) !== 8 &&
        parseInt(key) !== 9) ||
      parseInt(e.target.value.length) === 15
    ) {
    }
  };
  
  const autoComplete = (e) => {
    let currentInput = e.target.value;

    setipInput(currentInput);
  };
const newHostBtnDiv = <div>
        <button ref={newHostBtn}
        
        onClick={(event) => {
          
          
          event.target.className="invisible"
          
          setNewHost(true)
        }}
      >
        New Host
      </button>
</div>

const newHostFormDiv=<div>{newHost ? (
    <div className="newHostForm">
     
        <div className="Xbtn" onClick={()=>{
        
        newHostBtn.current.className=""
        setNewHost(null)}
        } >
        <Xbutton  />
        </div>
      <input
        value={ipInput}
        onChange={(e) => autoComplete(e)}
        onKeyPress={(e) => validateIP(e)}
        type="text"
        max="15"
        placeholder="Please enter ip"
      ></input>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Please enter user"
      ></input>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Please enter Password"
      ></input>
      {ipInput.length<=0||username.length<=0||password.length<=0?<button
        disabled>add Host
      </button>:<button
        onClick={() =>{

          setNewHost(null);
          newHostBtn.current.className=""
          addHost({
            ESXI_IP: ipInput,
            ESXI_USER: username,
            ESXI_PASSWORD: password,
          })
        }
          
        }
      >
        add Host
      </button>}
    </div>
    
  ) : null}</div>
    return (
        <div>
            {newHostBtnDiv}
        {newHostFormDiv}
        </div>
    )
}

export default NewHostForm;