import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

import axios from "./api/axios";

function App() {
  const [vms, setVms] = useState(null);
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
    </div>
  );
}

export default App;
