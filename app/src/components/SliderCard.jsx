"use client";
import React from "react";
import Image from "next/image";
import { m } from "framer-motion";

const SliderCard = ({
    heading = "",
    icon = "",
    details = "",
    isActive = false,
}) => {
  return (
    <m.div
        className={`slider-card ${isActive ? "active" : "inactive"}`}
        animate={{
            scale: isActive ? 1 : 0.92,
            opacity: isActive ? 1 : 0.75,
            filter: isActive
                ? "blur(0px)"
                : "blur(1px)",
            y: isActive ? 0 : 10,
        }}
        transition={{
            duration: 1,
            ease: "easeInOut",
        }}
    >
        <div className="slider-card-hdr">
            <div className="slider-hdr">{heading}</div>
            <div className="slider-icon">
                <Image
                    src={icon}
                    width={40}
                    height={40}
                    alt="slider icon"
                />
            </div>
        </div>
        <div className="slider-details">{details}</div>
    </m.div>
  );
};

export default React.memo(SliderCard);