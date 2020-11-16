import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import powerButtonOffline from "./assets/powerButton-red.svg";
import powerButtonOnline from "./assets/powerButton-green.svg";
import Tree from "./tree/Tree";
import axios from "./api/axios";

function App() {
  const [vms, setVms] = useState(null);
  const [hosts, setHosts] = useState([]);
  const [newHost, setNewHost] = useState(null);
  const [ipInput, setipInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [interval, setIntervalTime] = useState(null);
  const getData = () => {
    axios
      .get("/")
      .then((res) => {
        const obj = { machines: [] };
        if (res.data.length > 0) {
          res.data.forEach((element) => {
            if (obj.ip) {
              if (obj.ip === element.ESXI_IP) {
                obj.machines.push({
                  vmName: element.VM_name,
                  vmId: element.VMid,
                  vmStatus: element.vmStatus,
                });
              }
            } else {
              obj.ip = element.ESXI_IP;
            }

            //,VMid,vmStatus
          });
          setHosts([...hosts, obj]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateStatusUI = (seconds) => {
    setIntervalTime(setInterval(getData, seconds * 1000));
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

    console.log(key);
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
  const charAmount = (string, char, amount) => {
    let charCount = 0;
    for (let index = 0; index < string.length; index++) {
      const element = string[index];
      if (element === char && charCount < amount) {
        charCount = charCount + 1;
        return true;
      } else {
        return false;
      }
    }
  };
  const autoComplete = (e) => {
    let currentInput = e.target.value;
    const dotCount = charAmount(currentInput, ".", 4);
    // if (dotCount === true) {
    //   currentInput = currentInput + ".";
    // }
    setipInput(currentInput);
  };

  const clearItnterval_ = () => {
    clearInterval(interval);
    setIntervalTime(null);
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
    updateStatusUI(3);
  }, []);

  return (
    <div className="App">
      <h1>Virtual Machines</h1>
      <button
        style={{ position: "absolute", left: "97px" }}
        onClick={() => setNewHost(true)}
      >
        New Host
      </button>
      {interval ? (
        <div>
          <h1>IntervalWorking</h1>
          <button
            style={{ position: "absolute", left: "97px", top: "40px" }}
            onClick={() => clearItnterval_()}
          >
            cancel interval
          </button>
        </div>
      ) : (
        <button
          style={{ position: "absolute", left: "97px", top: "40px" }}
          onClick={() => updateStatusUI(3)}
        >
          setInterval
        </button>
      )}
      {hosts
        ? hosts.map((host) => (
            <Tree
              hostip={host.ip}
              vms={host.machines}
              turnOnComputer={(vmid, vmstatus) =>
                turnOnComputer(vmid, vmstatus)
              }
              powerOffBtn={powerButtonOffline}
              powerOnBtn={powerButtonOnline}
            ></Tree>
          ))
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
    </div>
  );
}

export default App;
