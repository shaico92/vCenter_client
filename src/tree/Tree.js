import React, { useEffect, useRef, useState } from "react";
import "./Tree.css";
import Arrow from "../assets/iconmonstr-arrow.svg";

const Tree = ({
  children,
  removeHost,
  vms,
  turnOnComputer,
  powerOffBtn,
  dragEnd,
  powerOnBtn,
  hostip,
}) => {
  const [open, setOpen] = useState(null);
  const [drag, setDrag] = useState("");
  const [rightClickOptionOpen, setRightClickOptionOpen] = useState(null);
  
  const arrow = useRef();
  useEffect(() => {
    
  },[vms,drag]);

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
    setDrag("Gone")
    event.dataTransfer.setData("TrashBin",event.target.id);
    
  }
  const onDragHandlerEnd=(event,hostip)=>{
    event.preventDefault();
    dragEnd();
    setDrag("")
    
    
    console.log('ending drag');
    
    
  }
  return (
    <div className={`tree${drag}`} id={hostip} draggable={true} onDragEnd={(event)=>onDragHandlerEnd(event,hostip)} onDragStart={event=>onDragHandlerStart(event,hostip)} >
      {open &&hostip ? (
        <div>
          <img 
            ref={arrow}
            onClick={() => openClose()}
            
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
                      <img src={powerOffBtn} alt="#" />
                    ) : (
                      <img src={powerOnBtn}  alt="#"/>
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
