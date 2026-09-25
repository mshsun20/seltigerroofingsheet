import React from 'react'
import { NavLink } from 'react-router';

const sidebarMainLinks = [
    { linkIndex: 0, name: "Dashboard", url: "/dashboard", level: 0 },
    { linkIndex: 1, name: "Blogs", url: "/blogs", level: 0 },
    { linkIndex: 2, name: "Image Uploader", url: "/image-uploader", level: 0 },
]
const sidebarBottomLinks = [
    { linkIndex: 0, name: "Accounts", url: "/accounts", level: 2 },
    {
        linkIndex: 1,
        name: "Masters",
        level: 2,
        children: [
            { childIndex: 0, name: "Roles", url: "/roles", level: 1 },
            { childIndex: 1, name: "Departments", url: "/departments", level: 2 },
            { childIndex: 3, name: "Sub Categories", url: "/subcategories", level: 2 },
            { childIndex: 4, name: "States", url: "/states", level: 2 },
            { childIndex: 5, name: "Products", url: "/products", level: 2 },
        ]
    }
]

const Sidebar = () => {
    const [open, setOpen] = React.useState(null)
    const sidebarRef = React.useRef(null);

    const handleChildren = (indx, section) => {
        const menuKey = `${section}-${indx}`;
        setOpen(p => p===menuKey ? null : menuKey);
    }

    const handleOutsideClick = React.useCallback((e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setTimeout(() => {
                setOpen(null);
            }, 0)
        }
    }, [])
    React.useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [handleOutsideClick])

  return (
    <div className="nv-sidebar">
        <div className="nv-sidebar-main">
            <div className="nv-sidebar-main-top"></div>
            {sidebarMainLinks?.length > 0
            && sidebarMainLinks?.map(lnk => (
                lnk?.url
                ? (<NavLink to={lnk?.url} key={lnk?.linkIndex} className="nv-sidebar-link">{lnk?.name}</NavLink>)
                : (<span key={lnk?.linkIndex} ref={open === `main-${lnk?.linkIndex}` ? sidebarRef : null} className="nv-sidebar-dash">
                    <span onClick={() => handleChildren(lnk?.linkIndex, "main")} className="nv-sidebar-link">
                        {lnk?.name}
                    </span>
                    {open === `main-${lnk?.linkIndex}` && (
                        <div className="nv-sidebar-children">
                            {lnk?.children?.length > 0
                            && lnk?.children?.map(child => (
                                <NavLink to={child?.url} key={child?.linkIndex} className="nv-sidebar-child-link">{child?.name}</NavLink>
                            ))}
                        </div>
                    )}
                </span>)
            ))}
        </div>
        <div className="nv-sidebar-bottom">
            {sidebarBottomLinks?.length > 0
            && sidebarBottomLinks?.map(lnk => (
                lnk?.url
                ? (<NavLink to={lnk?.url} key={lnk?.linkIndex} className="nv-sidebar-link">{lnk?.name}</NavLink>)
                : (<span key={lnk?.linkIndex} ref={open === `bottom-${lnk?.linkIndex}` ? sidebarRef : null} className="nv-sidebar-dash">
                    <span onClick={() => handleChildren(lnk?.linkIndex, "bottom")} className="nv-sidebar-link">
                        {lnk?.name}
                    </span>
                    {open === `bottom-${lnk?.linkIndex}` && (
                        <div className="nv-sidebar-children">
                            {lnk?.children?.length > 0
                            && lnk?.children?.map(child => (
                                <NavLink to={child?.url} key={child?.linkIndex} className="nv-sidebar-child-link">{child?.name}</NavLink>
                            ))}
                        </div>
                    )}
                </span>)
            ))}
        </div>
    </div>
  )
}

export default React.memo(Sidebar)