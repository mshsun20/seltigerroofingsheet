import React from 'react'
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Nav = ({ children }) => {
  return (
    <div className="nv-shell">
        <Sidebar />
        <div className="nv-main">
            <Topbar />
            <div className="nv-container">{children}</div>
        </div>
    </div>
  )
}

export default React.memo(Nav)