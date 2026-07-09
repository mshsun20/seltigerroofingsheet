"use client";
import { useRef, useState, useCallback } from "react";

const useSubmenuPosition = () => {
    const triggerRef = useRef(null);
    const submenuRef = useRef(null);
    const [position, setPosition] = useState({
        horizontal: "right",
        vertical: "top",
    });

    const calculatePosition = useCallback(() => {
        const menu = submenuRef.current;
        if (!menu) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const submenuWidth = menu.offsetWidth;
        const submenuHeight = menu.offsetHeight;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let horizontal = "right";
        let vertical = "top";

        //------------------------------------------
        // Horizontal
        //------------------------------------------
        const predictedRight = triggerRect.right + submenuWidth;
        if (predictedRight > viewportWidth) {
            horizontal = "left";
        }
        const predictedLeft = triggerRect.left - submenuWidth;
        if (horizontal === "left" && predictedLeft < 0) {
            horizontal = "right";
        }

        //------------------------------------------
        // Vertical
        //------------------------------------------
        const predictedBottom = triggerRect.top + submenuHeight;
        if (predictedBottom > viewportHeight) {
            vertical = "bottom";
        }

        setPosition({ horizontal, vertical });
    }, []);

    return {
        triggerRef,
        submenuRef,
        position,
        calculatePosition,
    };
}

export default useSubmenuPosition;