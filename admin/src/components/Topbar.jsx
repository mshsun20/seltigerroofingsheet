import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/slices/authSlice";

const Topbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            if (confirm("Confirm Logout ?")) {
                await dispatch(logout());
            }
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <div className="nv-topbar">
        <div className="nv-profile">
            <span className="nv-title">Welcome,&nbsp;</span>
            <span className="nv-info">{String(user?.fullName).split(" ")[0]}</span>
        </div>
        <div className="nv-vertical-divider"></div>
        <span className="nv-logout" onClick={handleLogout}>Logout</span>
    </div>
  )
}

export default React.memo(Topbar)