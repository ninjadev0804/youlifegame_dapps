import React from "react"
import { SidebarOpacity } from "./styles/SidebarStyling"

export const Sidebar = ({ openSidebar, children }) => {
  return (
    <>
      {openSidebar && <SidebarOpacity />}
      <div
        style={
          openSidebar
            ? {
                height: "100vh",
                width: "35rem",
                backgroundColor: "#fff",
                position: "absolute",
                top: "0",
                right: "0",
                backdropFilter: "drop-shadow(0px 0px 0.75rem #000000)",
                zIndex: 99,
              }
            : { display: "none" }
        }
      >
        {children}
      </div>
    </>
  )
}
