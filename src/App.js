//import logo from "./logo.svg";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import powerButtonOffline from "./assets/powerButton-red.svg";
import powerButtonOnline from "./assets/powerButton-green.svg";
import Xbutton from './assets/xBtn.svg'
import Tree from "./tree/Tree";
import Bin from './bin/Bin'
import EnableSSH from './sshEnableForm/sshEnableForm'
import Spinner from './Spinner/Spinner'
import axios from "./api/axios";

function App() {
  
  const [hosts, setHosts] = useState([]);
  const [newHost, setNewHost] = useState(null);
  const [ipInput, setipInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cancelDrag,setCancelDrag]=useState(null);
  const [WaitServer,setWaitServer]=useState(null);
  const newHostBtn = useRef();
  const getData = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const addHost = (cred) => {
    setNewHost(null);
    axios
      .post("/insertESXI", cred)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    console.log(value);
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
      console.log(err);})
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
      <button ref={newHostBtn}
        style={{ position: "absolute", left: "97px" }}
        onClick={(event) => {
          
          
          event.target.className="invisible"
          
          setNewHost(true)
        }}
      >
        New Host
      </button>
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

      {newHost ? (
        <div className="newHostForm">
          <img onClick={()=>{
            
            newHostBtn.current.className=""
            setNewHost(null)}
            } className="Xbtn" src={Xbutton} alt="#"/>
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
          <button
            onClick={() =>
              addHost({
                ESXI_IP: ipInput,
                ESXI_USER: username,
                ESXI_PASSWORD: password,
              })
            }
          >
            add Host
          </button>
        </div>
        
      ) : null}
      {
        
        <Bin removeDrag={cancelDrag} throwTrash={data=>deleteHost({ip:data})}/>



      }
      <Spinner load={WaitServer}>Please Wait while operation is performed</Spinner>
<EnableSSH enableSSH={(value)=>enableSSHSelenium(value)}/>
          </div>
  );
}

export default App;
