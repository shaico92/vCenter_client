//import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import powerButtonOffline from "./assets/powerButton-red.svg";
import powerButtonOnline from "./assets/powerButton-green.svg";
import Tree from "./tree/Tree";
import Bin from './bin/Bin'
import axios from "./api/axios";

function App() {
  
  const [hosts, setHosts] = useState([]);
  const [newHost, setNewHost] = useState(null);
  const [ipInput, setipInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const getData = () => {
    axios
      .get("/")
      .then((res) => {
        console.log(res.data.length);
        console.log(hosts.length);
        if ((res.data.length > 0) &&(res.data.length>hosts.length)) {
          const tempArr = [];
          
          res.data.forEach((element) => {
            
            const obj = element;
            tempArr.push(obj)
            //hosts.push(obj);
          
            
          });
          setHosts(tempArr)
          console.log('now should show tree');
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    
  });

  return (
    <div className="App">
      <h1>Virtual Machines</h1>
      <button
        style={{ position: "absolute", left: "97px" }}
        onClick={() => setNewHost(true)}
      >
        New Host
      </button>
      {hosts.length>0
        ? hosts.map((host) => {
            console.log(host);
            return (
              <Tree
                key = {hosts.indexOf(host)+1}
                hostip={host.ip}
                vms={host.vms}

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
      {newHost ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            margin: "13% 35%",
          }}
        >
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
      <Bin throwTrash={data=>deleteHost({ip:data})}/>
    </div>
  );
}

export default App;
