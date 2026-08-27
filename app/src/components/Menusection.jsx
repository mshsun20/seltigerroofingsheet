"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
    ChevronRight,
    ChevronDown,
    X
} from "lucide-react"
import useSubmenuPosition from "@/hooks/useSubmenuPosition"

/* =========================================================================================
   MOBILE MENU ITEM
========================================================================================= */
const MobileMenuItem = ({ item, level = 0, onToggle }) => {
    const [open, setOpen] = React.useState(false)

    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    const hasPath = Boolean(item.path)

    const handleToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setOpen((prev) => !prev)
    }

    return (
        <li className="mobile-menu-item">

            {hasChildren ? (

                <>

                    <div className={`mobile-submenu-toggle level-${level}`}>

                        {/* =================================================
                            MENU ITEM
                        ================================================= */}

                        {hasPath ? (

                            /*
                             * HAS PATH + CHILDREN
                             *
                             * Name  -> Navigate
                             * Arrow -> Toggle accordion
                             */
                            <Link
                                href={item.path}
                                target={item.target || "_self"}
                                onClick={onToggle}
                            >
                                {item.name}
                            </Link>

                        ) : (

                            /*
                             * NO PATH + CHILDREN
                             *
                             * Name -> Toggle accordion
                             */
                            <button
                                type="button"
                                onClick={handleToggle}
                                className="mobile-parent-button"
                            >
                                {item.name}
                            </button>

                        )}

                        {/* =================================================
                            ARROW
                        ================================================= */}

                        <button
                            type="button"
                            className={`mobile-arrow ${open ? "open" : ""}`}
                            onClick={handleToggle}
                            aria-label={`Toggle ${item.name} submenu`}
                            aria-expanded={open}
                        >
                            <ChevronRight size={16} />
                        </button>

                    </div>


                    {/* =====================================================
                        CHILDREN
                    ===================================================== */}

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

                /* =========================================================
                   ICON ITEM
                ========================================================= */

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

                /* =========================================================
                   NO CHILDREN + PATH
                ========================================================= */

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
    const [open, setOpen] = React.useState(false)

    const hasChildren = item.children && item.children.length > 0
    const hasPath = Boolean(item.path)

    const {
        triggerRef,
        submenuRef,
        position,
        calculatePosition
    } = useSubmenuPosition()

    const [positionCalculated, setPositionCalculated] = React.useState(false)

    return (
        <li
            ref={triggerRef}
            className={`menu-item ${hasChildren ? "has-children" : ""}`}

            onMouseEnter={() => {
                if (hasChildren) {
                    setOpen(true)

                    if (!positionCalculated) {
                        requestAnimationFrame(() => {
                            calculatePosition()
                            setPositionCalculated(true)
                        })
                    }
                }
            }}

            onMouseLeave={() => {
                if (hasChildren) {
                    setOpen(false)
                    setPositionCalculated(false)
                }
            }}
        >

            {/* =========================================================
                ITEM WITH CHILDREN
            ========================================================= */}

            {hasChildren ? (
                <>
                    {hasPath ? (
                        <Link
                            href={item.path}
                            target={item.target || "_self"}
                            className="submenu-toggle"
                        >
                            <span>{item.name}</span>

                            <span
                                className={`desktop-arrow ${
                                    open ? "open" : ""
                                }`}
                            >
                                <ChevronDown size={15} />
                            </span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="submenu-toggle"
                            onClick={() => setOpen(!open)}
                        >
                            <span>{item.name}</span>

                            <span
                                className={`desktop-arrow ${
                                    open ? "open" : ""
                                }`}
                            >
                                <ChevronDown size={15} />
                            </span>
                        </button>
                    )}

                    <ul
                        ref={submenuRef}
                        className={`
                            desktop-submenu
                            ${position.horizontal}
                            ${position.vertical}
                            ${open ? "open" : ""}
                        `}
                    >
                        {item.children.map((child, index) => (
                            <DesktopMenuItem
                                key={index}
                                item={child}
                            />
                        ))}
                    </ul>
                </>
            ) : item.icon ? (

                /* =========================================================
                   ICON ITEM
                ========================================================= */

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

                /* =========================================================
                   NORMAL LINK
                ========================================================= */

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
    React.useEffect(() => {
        if (!mobile) return
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [mobile])

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