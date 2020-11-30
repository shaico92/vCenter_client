import React, { useEffect, useRef, useState } from "react";
import "./Tree.css";
import Arrow from "../assets/iconmonstr-arrow.svg";

const Tree = ({
  children,
  removeHost,
  vms,
  turnOnComputer,
  powerOffBtn,
  
  powerOnBtn,
  hostip,
}) => {
  const [open, setOpen] = useState(null);
  const [rightClickOptionOpen, setRightClickOptionOpen] = useState(null);
  const arrow = useRef();
  useEffect(() => {
    
  },[vms]);

  const openClose = () => {
    if (open) {
      setOpen(null);
    } else {
      setOpen(true);
    }
  };

  const rightClick = (event) => {
    event.preventDefault();
    setRightClickOptionOpen(true);
    console.log(arrow);
  };
  const onDragHandlerStart=(event,hostip)=>{
    event.dataTransfer.setData("TrashBin",event.target.id);
    
  }
  const onDragHandlerEnd=(event,hostip)=>{
    event.preventDefault();
    
  }
  return (
    <div id={hostip} draggable={true} onDragEnd={(event)=>onDragHandlerEnd(event,hostip)} onDragStart={event=>onDragHandlerStart(event,hostip)} >
      {open &&hostip ? (
        <div>
          <img
            ref={arrow}
            onClick={() => openClose()}
            onContextMenu={rightClick()}
            className="open"
            src={Arrow}
            alt=""
          />
          host ip - {hostip}
          {rightClickOptionOpen ? (
            <button
              onClick={()=>removeHost(hostip)}
              className="rightClickMenu"
              style={{
                left: arrow.current.offsetLeft + 7,
                top: arrow.current.offsetTop + 5,
              }}
            >
              Delete Host
            </button>
          ) : null}
          {vms
            ? vms.map((vm) => {
                return (
                  <div
                    key={`${hostip}-${vm.vmId}`}
                    onClick={() => turnOnComputer(vm.vmId, vm.vmStatus)}
                  >
                    <button>
                      VM id -{vm.vmId}, VM Name - {vm.vmName}
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
          <img
            onClick={() => openClose()}
            onContextMenu={rightClick}
            src={Arrow}
            ref={arrow}
            alt=""
          />
          host ip - {hostip}
          {rightClickOptionOpen ? (
            <button
              className="rightClickMenu"
              style={{
                left: arrow.current.offsetLeft + 7,
                top: arrow.current.offsetTop + 5,
              }}
            >
              Delete Host
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Tree;
