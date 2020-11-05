import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

import axios from "./api/axios";

function App() {
  const [vms, setVms] = useState(null);
  const [newHost,setNewHost] = useState(null);
  const [ipInput, setipInput] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const getData = () => {
    axios
      .get("/")
      .then((res) => {
        console.log(res.data);
        setVms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addHost=(cred)=>{
      axios.post('/insertESXI',cred).then(res=>{console.log(res);}).catch(err=>{console.log(err);})
  }

  const validateIP =(e)=>{
    const key = e.key;
    
    console.log(key);
    if ((parseInt(key)!==0&&parseInt(key)!==1&&parseInt(key)!==2&&parseInt(key)!==3&&parseInt(key)!==4&&parseInt(key)!==5&&parseInt(key)!==6&&parseInt(key)!==7&&parseInt(key)!==8&&parseInt(key)!==9)||parseInt(e.target.value.length)===15) {
      e.preventDefault();
      
    }
    
}
  const autoComplete =(e)=>{
    let currentInput=e.target.value;
    const dot = e.key;
    if (currentInput.length===3||currentInput.length===7||currentInput.length===11||e.key==='.') {
        currentInput = currentInput + '.';   
        
       }
       setipInput(currentInput);
    

  }
  const turnOnComputer = (id) => {
    axios
      .post("/turnOn", id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Virtual Machines</h1>
      <button style={{position: 'absolute',left : '97px'}} onClick={()=>setNewHost(true)}>New Host</button>
      {vms
        ? vms.map((vm) => {
            return (
              <div onClick={() => turnOnComputer(vm.VMid)}>
                <button>
                  VM id -{vm.VMid}, VM Name - {vm.VM_name}
                </button>
                <br />
              </div>
            );
          })
        : null}
        {newHost?
        <div style={{display: 'flex', flexDirection: 'column', width: '30%',margin : '13% 35%'}} >
            <input value={ipInput} onChange={(e)=>autoComplete(e)} onKeyPress={(e)=>validateIP(e)} type='text' max="15" placeholder='Please enter ip'></input>
            <input type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Please enter user'></input>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Please enter Password'></input>
              <button onClick={()=>addHost({ESXI_IP: ipInput,ESXI_USER: username,ESXI_PASSWORD: password})}>add Host</button>
        </div>:null}
    </div>
  );
}


export default App;
