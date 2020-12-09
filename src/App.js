//import logo from "./logo.svg";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import powerButtonOffline from "./assets/powerButton-red.svg";
import powerButtonOnline from "./assets/powerButton-green.svg";

import Xbutton from './assets/Xbtn'
import Tree from "./tree/Tree";
import Bin from './bin/Bin'
import EnableSSH from './sshEnableForm/sshEnableForm'
import Spinner from './Spinner/Spinner'
import NewHostForm from './NewHost/NewHost'
import ErrorMsg from './ErrorMsg/ErrorMsg'
import axios from "./api/axios";

function App() {
  
  const [hosts, setHosts] = useState([]);
  // const [newHost, setNewHost] = useState(null);
  // const [ipInput, setipInput] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [cancelDrag,setCancelDrag]=useState(null);
  const [WaitServer,setWaitServer]=useState(null);
  const [Error, setError] = useState(null);
  // const newHostBtn = useRef();
  const getData = () => {
    setWaitServer(true);
    axios
      .get("/")
      .then((res) => {

        
        if ((res.data.length > 0) &&(res.data.length>hosts.length)) {
          const tempArr = [];
          
          res.data.forEach((element) => {
            
            const obj = element;
            tempArr.push(obj)
            //hosts.push(obj);
          
            
          });
          setHosts(tempArr)
          
        }else{
            
        }
        setWaitServer(null);
      })
      .catch((err) => {
        console.log(err);
        setWaitServer(null);
        setError(err.response.data.message);
      });
  };
  
  const addHost = (cred) => {
    
    setWaitServer(true);
    axios
      .post("/insertESXI", cred)
      .then((res) => {
        console.log(res);
        setWaitServer(null);
      })
      .catch((err) => {
        console.log(err);
        setWaitServer(null);
        setError(err.response.data.message);
      });
  };

  
  
  const deleteHost = (hostip) => {
    
    
    axios
      .post("/deleteHost", hostip)
      .then((res) => {
        console.log(res);
        const arr = [];
        hosts.forEach(host=>{
          console.log(host);
          if (host.ip===res.data) {
            
          }else{
            arr.push(host);
          }
        })
        setHosts(arr);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const enableSSHSelenium=(value)=>{

    const obj = {user : value.username,pass: value.pass}
    setWaitServer(true);
    axios
    .post(`/checkSSH/${value.ip}`,obj)
    .then(res=>{if (res) {
      console.log(res.data);
      setWaitServer(null)
    }})
    .catch(err=>{
      setWaitServer(null)
      setError(err.response.data.message);
      
    }
      )
  }

  const turnOnComputer = (id, status) => {
    const vm = { id: id, currentStatus: status };

    axios
      .post("/powerOnOff", vm)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    
  },[hosts]);

  return (
    <div className="App">
      <h1>Virtual Machines</h1>
      <NewHostForm addHost={data=>addHost(data)}/>
      
     <div className="treeContainer">
 
     {hosts.length>0
        ? hosts.map((host) => {

            return (
              <Tree
                key = {hosts.indexOf(host)+1}
                hostip={host.ip}
                vms={host.vms}
                dragEnd={()=>setCancelDrag(!cancelDrag)}
                removeHost={(hostip) => deleteHost(hostip)}
                turnOnComputer={(vmid, vmstatus) =>
                  turnOnComputer(vmid, vmstatus)
                }
                powerOffBtn={powerButtonOffline}
                powerOnBtn={powerButtonOnline}
              ></Tree>
            );
          })
        : null}
     </div>

      {
        
        <Bin removeDrag={cancelDrag} throwTrash={data=>deleteHost({ip:data})}/>



      }
      <Spinner  load={WaitServer}>Please Wait while operation is performed</Spinner>
      
<EnableSSH enableSSH={(value)=>enableSSHSelenium(value)}/>
{Error?<ErrorMsg closeError={()=>setError(null)} msg={Error}/>:null}
          </div>
  );
}

export default App;
