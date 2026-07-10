"use client";
import React from "react";
import "@/styles/components/beforeafterslider.css";
import Image from "next/image";

const BeforeAfterSlider = ({
    beforeImage,
    afterImage,
    beforeAlt = "Before",
    afterAlt = "After",
}) => {
    const containerRef = React.useRef(null);
    const [position, setPosition] = React.useState(50);
    const [isDragging, setIsDragging] = React.useState(false);
    const updatePosition = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        const percentage = (x / rect.width) * 100;
        setPosition(percentage);
    };
    const handlePointerDown = (e) => {
        setIsDragging(true);
        updatePosition(e.clientX);
    };
    const handlePointerMove = (e) => {
        if (!isDragging) return;
        updatePosition(e.clientX);
    };
    const handlePointerUp = () => {
        setIsDragging(false);
    };

  return (
    <div
        ref={containerRef}
        className="ba-container"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
    >
        {" "}
        {/* Before Image */}{" "}
        <div className="ba-image ba-before">
            <Image
                src={beforeImage}
                alt={beforeAlt}
                width={5000}
                height={5000}
            />
        </div>

        <div
            className="ba-image ba-after"
            style={{
                clipPath: `inset(0 0 0 ${position}%)`,
            }}
        >
            <Image
                src={afterImage}
                alt={afterAlt}
                width={5000}
                height={5000}
            />
        </div>

        <div
            className="ba-slider"
            style={{
                left: `${position}%`,
            }}
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                handlePointerDown(e);
            }}
        >
            {" "}
            <svg
                className="ba-slider-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="currentColor"
            >
                {" "}
                <path d="M12.121 4.703V.488c0-.302.384-.454.609-.24l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z" />{" "}
                <path d="M5.879 4.703V.488c0-.302-.384-.454-.609-.24L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z" />{" "}
            </svg>{" "}
        </div>{" "}
    </div>
  );
};

export default React.memo(BeforeAfterSlider);
