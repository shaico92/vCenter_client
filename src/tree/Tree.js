import React, { useEffect, useState } from "react";
import "./Tree.css";
import Arrow from "../assets/iconmonstr-arrow.svg";

const Tree = ({
  children,
  vms,
  turnOnComputer,
  powerOffBtn,
  powerOnBtn,
  hostip,
}) => {
  const [open, setOpen] = useState(null);

  useEffect(() => {}, [vms]);

  const openClose = () => {
    if (open) {
      setOpen(null);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      {open ? (
        <div>
          <img
            onClick={() => openClose()}
            className="open"
            src={Arrow}
            alt=""
          />
          host ip - {hostip}
          {vms
            ? vms.map((vm) => {
                return (
                  <div onClick={() => turnOnComputer(vm.vmId, vm.vmStatus)}>
                    <button>
                      VM id -{vm.VMid}, VM Name - {vm.vmName}
                    </button>
                    {vm.vmStatus === 0 ? (
                      <img src={powerOffBtn} />
                    ) : (
                      <img src={powerOnBtn} />
                    )}
                    <br />
                  </div>
                );
              })
            : null}
          {children}
        </div>
      ) : (
        <div>
          <img onClick={() => openClose()} src={Arrow} alt="" />
          host ip - {hostip}
        </div>
      )}
    </div>
  );
};

export default Tree;
