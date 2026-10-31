
"use client";

import Image from "next/image";
import React from "react";
import "@/styles/components/wallcard.css";

const WallCard = ({
    id = 0,
    contentWall,
    title,
    description,
    renderAction,
    onClick,
    width = "100%",
    height = "100%",
}) => {
    return (
        <div
            className="wallcard-content"
            style={{ width, height }}
            onClick={onClick}
        >
            <div className="wall-section">
                <Image
                    src={contentWall?.url}
                    alt={contentWall?.alt || title || "Wall image"}
                    width={contentWall?.width}
                    height={contentWall?.height}
                    sizes="100vw"
                />
            </div>

            <div className="caption-section">
                <div className="title-section">
                    {title}
                </div>

                <div className="action-section">
                    {renderAction}
                </div>
            </div>
        </div>
    );
};

export default React.memo(WallCard);
