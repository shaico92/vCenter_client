import React,{useEffect,useRef} from 'react';


import Tree from "../tree/Tree";
import "./TreesContainer.css"


const TreesContainer= ({hosts,setCancelDrag,deleteHost,turnOnComputer})=>{

    useEffect(() => {
        
    }, [hosts]);

    return (
        <div className="treeContainer">
 
     {hosts.length>0
        ? hosts.map((host) => {

            return (
              <Tree
                key = {hosts.indexOf(host)+1}
                hostip={host.ip}
                vms={host.vms}
                dragEnd={()=>setCancelDrag(null)}
                removeHost={(hostip) => deleteHost(hostip)}
                turnOnComputer={(hostip,vmName,vmid, vmstatus) =>
                  turnOnComputer(hostip,vmName, vmid, vmstatus)
                }
              ></Tree>
            );
          })
        : null}
     </div>
    )



}
export default TreesContainer;