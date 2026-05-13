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

const MobileMenuItem = ({ item, level = 0, onToggle }) => {
    const [open, setOpen] = React.useState(false)

    const hasChildren =
        item.children && item.children.length > 0

    return (
        <li className="mobile-menu-item">
            {hasChildren ? (
                <>
                    <button
                        type="button"
                        className={`mobile-submenu-toggle level-${level}`}
                        onClick={() => setOpen(!open)}
                    >
                        <span>{item.name}</span>

                        <span
                            className={`mobile-arrow ${open ? "open" : ""}`}
                        >
                            <ChevronRight size={16} />
                        </span>
                    </button>

                    <div
                        className={`mobile-submenu-wrapper ${
                            open ? "open" : ""
                        }`}
                    >
                        <ul className="mobile-submenu">
                            {item.children.map((child, index) => (
                                <MobileMenuItem
                                    key={index}
                                    item={child}
                                    level={level + 1}
                                    onToggle={onToggle}
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
                    onClick={onToggle}
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
                    className={`mobile-menu-link level-${level}`}
                    onClick={onToggle}
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
                        onToggle={onToggle}
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