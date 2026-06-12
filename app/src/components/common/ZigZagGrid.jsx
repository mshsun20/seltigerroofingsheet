"use client";
import React from "react";

export default function ZigZagGrid({ items, renderItem, minItemWidth = "120px", gap = "15px" }) {
    const containerRef = React.useRef(null);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container || !items.length) return;

        const calculateLayout = () => {
        // 1. Temporarily render all items inline to measure where the browser forces wraps
        const children = Array.from(container.children);
        if (!children.length) return;

        let itemsPerRow = 0;
        let initialTop = null;

        // 2. Detect the fluid wrapping threshold based on vertical position
        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect();
            if (initialTop === null) {
            initialTop = rect.top;
            }

            // The moment an item drops below the first item's top coordinate, a wrap occurred
            if (rect.top > initialTop) {
            break;
            }
            itemsPerRow++;
        }

        if (itemsPerRow === 0) itemsPerRow = 1;

        // 3. Group the original items array into sub-arrays (chunks) based on the calculated math
        const newRows = [];
        for (let i = 0; i < items.length; i += itemsPerRow) {
            newRows.push(items.slice(i, i + itemsPerRow));
        }

        setRows(newRows);
        };

        // 4. Optimize performance by debouncing the execution frame
        let animationFrameId;
        const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(calculateLayout);
        });

        resizeObserver.observe(container);

        // Initial run
        calculateLayout();

        return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        };
    }, [items]);

    // Before the client-side measurement happens, render a flat flexbox structure as a fallback
    if (rows.length === 0) {
        return (
        <div
            ref={containerRef}
            style={{
            display: "flex",
            flexWrap: "wrap",
            gap: gap,
            width: "100%",
            }}
        >
            {items.map((item, index) => (
            <div key={index} style={{ flex: "1 1 calc(100% / 3)", minWidth: minItemWidth }}>
                {renderItem(item, index)}
            </div>
            ))}
        </div>
        );
    }

    // Once measured, render structured rows with alternating flex-directions
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: gap,
                width: "100%",
            }}
        >
            {rows.map((rowItems, rowIndex) => {
                const isEvenRow = rowIndex % 2 !== 0; // 0-indexed: row 0 (L-to-R), row 1 (R-to-L)
                return (
                    <div
                        key={rowIndex}
                        style={{
                            display: "flex",
                            flexDirection: isEvenRow ? "row-reverse" : "row",
                            gap: gap,
                            width: "100%",
                        }}
                    >
                        {rowItems.map((item, itemIndex) => {
                        // Calculate global index to preserve accurate numbering if needed
                        const globalIndex = rows.slice(0, rowIndex).reduce((acc, r) => acc + r.length, 0) + itemIndex;
                        return (
                            <div key={globalIndex} style={{ flex: 1, minWidth: minItemWidth }}>
                                {renderItem(item, globalIndex)}
                            </div>
                        );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
