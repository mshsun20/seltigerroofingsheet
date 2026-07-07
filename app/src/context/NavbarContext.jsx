"use client";
import React from 'react'
const NavbarContext = React.createContext()


const NavbarProvider = ({ children }) => {
    const [bannerActive, setBannerActive] = React.useState(true)

  return (
    <NavbarContext.Provider
        value={{
            bannerActive,
            setBannerActive
        }}
    >
        {children}
    </NavbarContext.Provider>
  )
}

export const useNavbar = () => React.useContext(NavbarContext)
export default NavbarProvider