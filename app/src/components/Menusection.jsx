"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
    ChevronRight,
    ChevronDown,
    X
} from "lucide-react"

/* =========================================================================================
   MOBILE MENU ITEM
========================================================================================= */

const MobileMenuItem = ({ item, level = 0 }) => {
    const [open, setOpen] = React.useState(false)
    const hasChildren = item.children && item.children.length > 0

    return (
        <li className="mobile-menu-item">
            {hasChildren ? (
                <>
                    <button
                        type="button"
                        className="mobile-submenu-toggle"
                        onClick={() => setOpen(!open)}
                    >
                        <span>{item.name}</span>
                        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    <div className={`mobile-accordion ${open ? "open" : ""}`}>
                        <ul className="mobile-accordion-menu">
                            {item.children.map((child, index) => (
                                <MobileMenuItem
                                    key={index}
                                    item={child}
                                    level={level + 1}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            ) : item.icon ? (
                <Link
                    href={item.path}
                    target={item.target || "_self"}
                    className="icon-link"
                >
                    <Image
                        src={item.icon}
                        alt={item.name}
                        width={100}
                        height={100}
                    />
                </Link>
            ) : (
                <Link
                    href={item.path}
                    target={item.target || "_self"}
                    className="mobile-menu-link"
                >
                    {item.name}
                </Link>
            )}
        </li>
    )
}

/* =========================================================================================
   DESKTOP MENU ITEM
========================================================================================= */

const DesktopMenuItem = ({ item }) => {
    const hasChildren = item.children && item.children.length > 0

    return (
        <li className={`menu-item ${hasChildren ? "has-children" : ""}`}>
            {hasChildren ? (
                <>
                    <button className="submenu-toggle">
                        <span>{item.name}</span>
                        <ChevronDown size={15} />
                    </button>
                    <ul className="desktop-submenu">
                        {item.children.map((child, index) => (
                            <DesktopMenuItem
                                key={index}
                                item={child}
                            />
                        ))}
                    </ul>
                </>
            ) : item.icon ? (
                <Link
                    href={item.path}
                    target={item.target || "_self"}
                    className="icon-link"
                >
                    <Image
                        src={item.icon}
                        alt={item.name}
                        width={100}
                        height={100}
                    />
                </Link>
            ) : (
                <Link
                    href={item.path}
                    target={item.target || "_self"}
                    className="menu-link"
                >
                    {item.name}
                </Link>
            )}
        </li>
    )
}

/* =========================================================================================
   MAIN COMPONENT
========================================================================================= */

const Menusection = ({
    menuItems,
    onToggle,
    mobile = false
}) => {
    return (
        <ul className="menu">
            {mobile && (
                <button
                    className="menuclose"
                    onClick={onToggle}
                >
                    <X size={18} />
                </button>
            )}
            {menuItems.map((item, index) => (
                mobile ? (
                    <MobileMenuItem
                        key={index}
                        item={item}
                    />
                ) : (
                    <DesktopMenuItem
                        key={index}
                        item={item}
                    />
                )
            ))}
        </ul>
    )
}

export default React.memo(Menusection)