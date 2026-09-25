import React from 'react'
import Nav from "./Nav";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { zoomFadeIn } from '../animations/allVariants';

const Layout = () => {
    const location = useLocation();
  return (
    <Nav>
        <AnimatePresence
            mode="wait"
            initial={false}
        >
            <Motion.div
                key={location.pathname}
                variants={zoomFadeIn}
                initial="hidden"
                animate="show"
                className="nv-content"
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <Outlet />
            </Motion.div>
        </AnimatePresence>
    </Nav>
  )
}

export default React.memo(Layout)