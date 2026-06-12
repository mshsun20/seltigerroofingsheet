"use client";
import React from "react";

const Accordion = ({
    items = [],
    multiple = false,
    defaultOpen = null,
    renderItem,
}) => {
    const [openItems, setOpenItems] = React.useState(multiple ? [] : defaultOpen);
    const toggle = (id) => {
        if (multiple) {
            setOpenItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
            return;
        }
        setOpenItems(prev => prev === id ? null : id);
    };

    return (
        <>
            {items.map(item => {
                const isOpen = multiple ? openItems.includes(item.id) : openItems === item.id;
                return renderItem(
                    item,
                    isOpen,
                    () => toggle(item.id)
                );
            })}
        </>
    );
};

export default React.memo(Accordion);