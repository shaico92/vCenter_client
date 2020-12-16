import React, { useEffect, useRef, useState } from "react";
import "./Tree.css";
import Arrow from "../assets/iconmonstr-arrow.svg";
import powerButtonOffline from "../assets/powerButton-red.svg";
import powerButtonOnline from "../assets/powerButton-green.svg";
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
  const tree= useRef();
  const [open, setOpen] = useState(null);
  const [drag, setDrag] = useState("");
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
    
    
    

    
  
    console.log("stating drag");
    

    event.dataTransfer.setData("TrashBin",event.target.id);
    
    setTimeout(()=>{
      event.target.className="Gone"
    },0);
    

    
    
  }
  const onDragHandlerEnd=(event,hostip)=>{
    
    dragEnd();
    
    event.target.className="tree"
    
    
    console.log('ending drag');
    
    
  }
  return (
    <div  ref={tree} className="main" id={hostip} draggable={true} onDragEnd={(event)=>onDragHandlerEnd(event,hostip)} onDragStart={event=>onDragHandlerStart(event,hostip)}>
      {open &&hostip ? (
        <div   className={`tree`}> 
          <div className="host_arrow">
          <img 
            ref={arrow}
            onClick={() => openClose()}
            
            className="arrow open"
            src={Arrow}
            alt=""
          />
          host ip - {hostip}
            </div>
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
          <div className="vmList">
            
          {vms
            ? vms.map((vm) => {
                return (
                  <div className="vm"
                    key={`${hostip}-${vm.vmId}`}
                    onClick={() => turnOnComputer(hostip,vm.vmName,vm.vmId, vm.vmStatus)}
                  >
                    <button>
                      VM id -{vm.vmId}, VM Name - {vm.vmName}
                    </button>
                    {vm.vmStatus === 0 ? (
                      <img className={"powerBtn"} src={powerButtonOffline} alt="#" />
                    ) : (
                      <img className={"powerBtn"} src={powerButtonOnline}  alt="#"/>
                    )}
                    <br />
                  </div>
                );
              })
            : null}
          </div>
          {children}
        </div>
      ) : (
        <div   className={`tree${drag}`}>
          
          <div className="host_arrow">
          <img className="arrow"
            onClick={() => openClose()}
            onContextMenu={rightClick}
            src={Arrow}
            ref={arrow}
            alt=""
          />
          host ip - {hostip}
            </div>


          
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
