import React,{useState, useEffect,useRef} from 'react'

import './Spinner.css'


const Spinner = ({children,load})=>{



useEffect(() => {
    
}, [load]);



const Spinner =<div>
    <div  className="loading"></div>
        
        <div   className="text">
        {children}
        </div>
</div>

return (
    
<div className="mainSpinner">
    {load?
Spinner:null}

</div>)

}

export default Spinner